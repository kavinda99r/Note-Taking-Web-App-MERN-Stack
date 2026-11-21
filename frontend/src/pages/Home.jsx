import Icon from "../components/Icon";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import ViewNote from "../components/ViewNote";
import AddEditNotes from "../components/AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Toast from "../components/Toast";
const Home = () => {
  const [viewedNoteId, setViewedNoteId] = useState(null);
  const [editor, setEditor] = useState({
    isShown: false,
    type: "add",
    data: null
  });
  const [toast, setToast] = useState({
    isShown: false,
    message: "",
    type: "add"
  });
  const [allNotes, setAllNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const showToastMessage = (message, type = "add") => setToast({
    isShown: true,
    message,
    type
  });
  const closeToast = useCallback(() => setToast({
    isShown: false,
    message: "",
    type: "add"
  }), []);
  const closeEditor = () => setEditor({
    isShown: false,
    type: "add",
    data: null
  });
  const addNote = () => setEditor({
    isShown: true,
    type: "add",
    data: null
  });
  const handleAuthError = useCallback(failure => {
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
  const deleteNote = async note => {
    try {
      await axiosInstance.delete("/delete-notes/" + note._id);
      setAllNotes(notes => notes.filter(item => item._id !== note._id));
      showToastMessage("Note deleted", "delete");
    } catch (failure) {
      if (!handleAuthError(failure)) showToastMessage("Unable to delete this note. Please try again.", "error");
    }
  };
  const updateIsPinned = async note => {
    try {
      const {
        data
      } = await axiosInstance.put("/update-note-pinned/" + note._id, {
        isPinned: !note.isPinned
      });
      setAllNotes(notes => notes.map(item => item._id === note._id ? data.note : item));
      showToastMessage(note.isPinned ? "Note unpinned" : "Note pinned");
    } catch (failure) {
      if (!handleAuthError(failure)) showToastMessage("Unable to update this note. Please try again.", "error");
    }
  };
  const viewedNote = allNotes.find(note => note._id === viewedNoteId);
  const closeModal = () => {
    setViewedNoteId(null);
    closeEditor();
  };
  const visibleNotes = allNotes.filter(note => `${note.title} ${note.content} ${(note.tags || []).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  return <div className="min-h-[100svh]">
      <Navbar onSearchNote={setQuery} handleClearSearch={() => setQuery("")} onAddNote={addNote} />
      <div className="grid-cols-[240px_minmax(0,_1fr)] max-[1250px]:grid-cols-[220px_minmax(0,_1fr)] max-[900px]:grid-cols-1 block min-h-[calc(100svh_-_80px)]">
        <main className="min-w-0 flex flex-col w-[min(1240px,_calc(100%_-_96px))] max-w-[1240px] mx-auto pt-[38px] px-0 pb-[22px] min-h-[calc(100svh_-_80px)] max-[1050px]:w-[calc(100%_-_56px)] max-[540px]:w-[calc(100%_-_36px)] max-[540px]:pt-7" aria-label="Your notes">
          {loading ? <div className="flex-1 min-h-[350px] flex flex-col items-center justify-center text-center py-10 px-5 [&_>_span]:grid [&_>_span]:place-items-center [&_>_span]:w-[76px] [&_>_span]:h-[76px] [&_>_span]:bg-soft [&_>_span]:text-primary [&_>_span]:text-[34px] [&_>_span]:rounded-[22px] [&_>_span]:mb-[25px] [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:tracking-[-.7px] [&_p]:max-w-[370px] [&_p]:text-[15px] [&_p]:leading-[1.8] [&_p]:text-muted [&_p]:mt-3 [&_>_button]:mt-6 max-[600px]:min-h-[320px] max-[600px]:px-0 max-[600px]:[&_h2]:text-[23px]" role="status"><Icon name="journal-text" /><h2>Opening your notebook…</h2></div> : error ? <div className="flex-1 min-h-[350px] flex flex-col items-center justify-center text-center py-10 px-5 [&_>_span]:grid [&_>_span]:place-items-center [&_>_span]:w-[76px] [&_>_span]:h-[76px] [&_>_span]:bg-soft [&_>_span]:text-primary [&_>_span]:text-[34px] [&_>_span]:rounded-[22px] [&_>_span]:mb-[25px] [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:tracking-[-.7px] [&_p]:max-w-[370px] [&_p]:text-[15px] [&_p]:leading-[1.8] [&_p]:text-muted [&_p]:mt-3 [&_>_button]:mt-6 max-[600px]:min-h-[320px] max-[600px]:px-0 max-[600px]:[&_h2]:text-[23px]" role="alert"><Icon name="cloud-slash" /><h2>Your notebook couldn’t load.</h2><p>{error}</p><button className="button-primary" onClick={getALLNotes}>Try again</button></div> : visibleNotes.length ? <div className="grid grid-cols-4 gap-[18px] items-stretch max-[600px]:grid-cols-1 max-[600px]:gap-4 [@media(min-width:901px)_and_(max-width:1100px)]:grid-cols-3 [@media(min-width:601px)_and_(max-width:900px)]:grid-cols-2">{visibleNotes.map(note => <NoteCard key={note._id} title={note.title} date={note.createOn} content={note.content} tags={note.tags || []} isPinned={note.isPinned} onView={() => setViewedNoteId(note._id)} onEdit={() => setEditor({
            isShown: true,
            type: "edit",
            data: note
          })} onDelete={() => deleteNote(note)} onPinNote={() => updateIsPinned(note)} />)}</div> : <div className="flex-1 min-h-[350px] flex flex-col items-center justify-center text-center py-10 px-5 [&_>_span]:grid [&_>_span]:place-items-center [&_>_span]:w-[76px] [&_>_span]:h-[76px] [&_>_span]:bg-soft [&_>_span]:text-primary [&_>_span]:text-[34px] [&_>_span]:rounded-[22px] [&_>_span]:mb-[25px] [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:tracking-[-.7px] [&_p]:max-w-[370px] [&_p]:text-[15px] [&_p]:leading-[1.8] [&_p]:text-muted [&_p]:mt-3 [&_>_button]:mt-6 max-[600px]:min-h-[320px] max-[600px]:px-0 max-[600px]:[&_h2]:text-[23px]"><span className="grid place-items-center w-[76px] h-[76px] bg-soft text-primary text-[34px] rounded-[22px] mb-[25px]"><Icon name={query ? "search" : "journal-plus"} /></span><h2>{query ? "No notes found." : "A fresh page, just for you."}</h2><p>{query ? "Try another search to find your thoughts." : "Your next idea starts here. Create a note and see where it takes you."}</p>{!query && <button className="button-primary" onClick={addNote}><Icon name="plus-lg" /> Create your first note</button>}</div>}
          <footer className="mt-auto pt-[38px] flex justify-center items-center gap-2 text-muted text-[12px]"><Icon name="journal-bookmark" /> A little more organized. A little more you.</footer>
        </main>
      </div>
      <Modal isOpen={editor.isShown || Boolean(viewedNote)} onRequestClose={closeModal} contentLabel={viewedNote ? `View note: ${viewedNote.title}` : editor.type === "edit" ? "Edit note" : "New note"} className={viewedNote ? "max-h-[calc(100svh_-_48px)] overflow-y-auto outline-none p-[30px] rounded-[18px] border border-border bg-base shadow-[0_30px_80px_#263c4b33] max-[600px]:p-[22px] max-[600px]:max-h-[calc(100svh_-_28px)] w-[min(560px,_100%)] pt-[42px] px-10 pb-6 max-[600px]:pt-[30px] max-[600px]:px-6 max-[600px]:pb-[22px]" : "w-[min(600px,_100%)] max-h-[calc(100svh_-_48px)] overflow-y-auto outline-none p-[30px] rounded-[18px] border border-border bg-base shadow-[0_30px_80px_#263c4b33] max-[600px]:p-[22px] max-[600px]:max-h-[calc(100svh_-_28px)]"} overlayClassName="fixed inset-0 bg-[#263c4b66] backdrop-blur-[4px] z-[100] flex items-center justify-center p-6 max-[600px]:p-3.5">
        {viewedNote ? <ViewNote note={viewedNote} onClose={closeModal} onEdit={() => {
        setEditor({
          isShown: true,
          type: "edit",
          data: viewedNote
        });
        setViewedNoteId(null);
      }} /> : <AddEditNotes type={editor.type} noteData={editor.data} onclose={closeEditor} getALLNotes={getALLNotes} showToastMessage={showToastMessage} />}
      </Modal>
      <Toast isShown={toast.isShown} message={toast.message} type={toast.type} onclose={closeToast} />
    </div>;
};
export default Home;
