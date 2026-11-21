import Icon from "../components/Icon";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddEditNotes from "../components/AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Toast from "../components/Toast";
import "./Home.css";

const Home = () => {
  const [editor, setEditor] = useState({ isShown: false, type: "add", data: null });
  const [toast, setToast] = useState({ isShown: false, message: "", type: "add" });
  const [allNotes, setAllNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const showToastMessage = (message, type = "add") => setToast({ isShown: true, message, type });
  const closeToast = useCallback(() => setToast({ isShown: false, message: "", type: "add" }), []);
  const closeEditor = () => setEditor({ isShown: false, type: "add", data: null });
  const addNote = () => setEditor({ isShown: true, type: "add", data: null });
  const handleAuthError = useCallback((failure) => {
    if (failure.response?.status === 401) {

      navigate("/login");
      return true;
    }
    return false;
  }, [navigate]);
  const getALLNotes = useCallback(async () => {
    try {
      setError("");
      const response = await axiosInstance.get("/get-all-notes");
      setAllNotes(response.data.notes || []);
    } catch (failure) {
      if (!handleAuthError(failure)) setError("We couldn’t load your notes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);
  useEffect(() => {
    getALLNotes();
  }, [getALLNotes, handleAuthError]);

  const deleteNote = async (note) => {
    try {
      await axiosInstance.delete("/delete-notes/" + note._id);
      setAllNotes((notes) => notes.filter((item) => item._id !== note._id));
      showToastMessage("Note deleted", "delete");
    } catch (failure) {
      if (!handleAuthError(failure)) showToastMessage("Unable to delete this note. Please try again.", "error");
    }
  };
  const updateIsPinned = async (note) => {
    try {
      const { data } = await axiosInstance.put("/update-note-pinned/" + note._id, { isPinned: !note.isPinned });
      setAllNotes((notes) => notes.map((item) => item._id === note._id ? data.note : item));
      showToastMessage(note.isPinned ? "Note unpinned" : "Note pinned");
    } catch (failure) {
      if (!handleAuthError(failure)) showToastMessage("Unable to update this note. Please try again.", "error");
    }
  };
  const visibleNotes = allNotes.filter((note) =>
    `${note.title} ${note.content} ${(note.tags || []).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())
  ).sort((a, b) => Number(b.isPinned) - Number(a.isPinned));

  return (
    <div className="dashboard">
      <Navbar onSearchNote={setQuery} handleClearSearch={() => setQuery("")} onAddNote={addNote} />
      <div className="dashboard-layout">
        <main className="dashboard-main" aria-label="Your notes">
          {loading ? <div className="dashboard-empty" role="status"><Icon name="journal-text" /><h2>Opening your notebook…</h2></div> : error ? <div className="dashboard-empty" role="alert"><Icon name="cloud-slash" /><h2>Your notebook couldn’t load.</h2><p>{error}</p><button className="dashboard-primary" onClick={getALLNotes}>Try again</button></div> : visibleNotes.length ? (
            <div className="dashboard-notes">{visibleNotes.map((note) => <NoteCard key={note._id} title={note.title} date={note.createOn} content={note.content} tags={note.tags || []} isPinned={note.isPinned} onEdit={() => setEditor({ isShown: true, type: "edit", data: note })} onDelete={() => deleteNote(note)} onPinNote={() => updateIsPinned(note)} />)}</div>
          ) : <div className="dashboard-empty"><span className="dashboard-empty-icon"><Icon name={query ? "search" : "journal-plus"} /></span><h2>{query ? "No notes found." : "A fresh page, just for you."}</h2><p>{query ? "Try another search to find your thoughts." : "Your next idea starts here. Create a note and see where it takes you."}</p>{!query && <button className="dashboard-primary" onClick={addNote}><Icon name="plus-lg" /> Create your first note</button>}</div>}
          <footer className="dashboard-footer"><Icon name="journal-bookmark" /> A little more organized. A little more you.</footer>
        </main>
      </div>
      <Modal isOpen={editor.isShown} onRequestClose={closeEditor} contentLabel={editor.type === "edit" ? "Edit note" : "New note"} className="note-modal" overlayClassName="note-modal-overlay">
        <AddEditNotes type={editor.type} noteData={editor.data} onclose={closeEditor} getALLNotes={getALLNotes} showToastMessage={showToastMessage} />
      </Modal>
      <Toast isShown={toast.isShown} message={toast.message} type={toast.type} onclose={closeToast} />
    </div>
  );
};
export default Home;
