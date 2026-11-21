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

const styles = `
.dashboard { min-height: 100svh; }
.dashboard-layout {
  grid-template-columns: 240px minmax(0, 1fr);
}
.dashboard-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.dashboard-notes {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}
.dashboard-empty {
  flex: 1;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
}
.dashboard-empty-icon {
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  background: var(--color-soft);
  color: var(--color-primary);
  font-size: 34px;
  border-radius: 22px;
  margin-bottom: 25px;
}
.dashboard-empty > span {
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  background: var(--color-soft);
  color: var(--color-primary);
  font-size: 34px;
  border-radius: 22px;
  margin-bottom: 25px;
}
.dashboard-empty h2 {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -.7px;
}
.dashboard-empty p {
  max-width: 370px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-muted);
  margin-top: 12px;
}
.dashboard-empty > button {
  margin-top: 24px;
}
.dashboard-footer {
  margin-top: auto;
  padding-top: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--color-muted);
  font-size: 12px;
}
.note-modal-overlay {
  position: fixed;
  inset: 0;
  background: #263c4b66;
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.note-modal {
  width: min(600px, 100%);
  max-height: calc(100svh - 48px);
  overflow-y: auto;
  outline: none;
  padding: 30px;
  border-radius: 18px;
  border: 1px solid var(--color-border);
  background: var(--color-base);
  box-shadow: 0 30px 80px #263c4b33;
}
@media (max-width: 1250px) {
  .dashboard-main {
  padding: 32px;
}

}
@media (max-width: 1250px) {
  .dashboard-layout {
  grid-template-columns: 220px minmax(0, 1fr);
}

}
@media (max-width: 900px) {
  .dashboard-layout {
  grid-template-columns: 1fr;
}

}
@media (max-width: 900px) {
  .dashboard-main {
  padding: 30px 26px 22px;
}

}
@media (max-width: 600px) {
  .dashboard-main {
  padding: 27px 18px 20px;
}

}
@media (max-width: 600px) {
  .dashboard-notes {
  grid-template-columns: 1fr;
  gap: 16px;
}

}
@media (max-width: 600px) {
  .dashboard-empty {
  min-height: 320px;
  padding-inline: 0;
}

}
@media (max-width: 600px) {
  .dashboard-empty h2 {
  font-size: 23px;
}

}
@media (max-width: 600px) {
  .note-modal-overlay {
  padding: 14px;
}

}
@media (max-width: 600px) {
  .note-modal {
  padding: 22px;
  max-height: calc(100svh - 28px);
}

}
.dashboard-layout {
  display: block;
  min-height: calc(100svh - 80px);
}
.dashboard-main {
  width: min(1240px, calc(100% - 96px));
  max-width: 1240px;
  margin-inline: auto;
  padding: 38px 0 22px;
  min-height: calc(100svh - 80px);
}
@media (max-width: 1050px) {
  .dashboard-main {
  width: calc(100% - 56px);
}

}
@media (max-width: 540px) {
  .dashboard-main {
  width: calc(100% - 36px);
}

}
@media (max-width: 540px) {
  .dashboard-main {
  padding-top: 28px;
}

}
@media (min-width: 901px) and (max-width: 1100px) {
  .dashboard-notes {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

}
@media (min-width: 601px) and (max-width: 900px) {
  .dashboard-notes {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

}
.note-modal-view {
  width: min(560px, 100%);
  padding: 42px 40px 24px;
}
@media (max-width: 600px) {
  .note-modal-view {
  padding: 30px 24px 22px;
}

}
`;

const Home = () => {
  const [viewedNoteId, setViewedNoteId] = useState(null);
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
  const viewedNote = allNotes.find((note) => note._id === viewedNoteId);
  const closeModal = () => { setViewedNoteId(null); closeEditor(); };
  const visibleNotes = allNotes.filter((note) =>
    `${note.title} ${note.content} ${(note.tags || []).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())
  ).sort((a, b) => Number(b.isPinned) - Number(a.isPinned));

  return (
    <div className="dashboard">
      <style>{styles}</style>
      <Navbar onSearchNote={setQuery} handleClearSearch={() => setQuery("")} onAddNote={addNote} />
      <div className="dashboard-layout">
        <main className="dashboard-main" aria-label="Your notes">
          {loading ? <div className="dashboard-empty" role="status"><Icon name="journal-text" /><h2>Opening your notebook…</h2></div> : error ? <div className="dashboard-empty" role="alert"><Icon name="cloud-slash" /><h2>Your notebook couldn’t load.</h2><p>{error}</p><button className="button-primary" onClick={getALLNotes}>Try again</button></div> : visibleNotes.length ? (
            <div className="dashboard-notes">{visibleNotes.map((note) => <NoteCard key={note._id} title={note.title} date={note.createOn} content={note.content} tags={note.tags || []} isPinned={note.isPinned} onView={() => setViewedNoteId(note._id)} onEdit={() => setEditor({ isShown: true, type: "edit", data: note })} onDelete={() => deleteNote(note)} onPinNote={() => updateIsPinned(note)} />)}</div>
          ) : <div className="dashboard-empty"><span className="dashboard-empty-icon"><Icon name={query ? "search" : "journal-plus"} /></span><h2>{query ? "No notes found." : "A fresh page, just for you."}</h2><p>{query ? "Try another search to find your thoughts." : "Your next idea starts here. Create a note and see where it takes you."}</p>{!query && <button className="button-primary" onClick={addNote}><Icon name="plus-lg" /> Create your first note</button>}</div>}
          <footer className="dashboard-footer"><Icon name="journal-bookmark" /> A little more organized. A little more you.</footer>
        </main>
      </div>
      <Modal isOpen={editor.isShown || Boolean(viewedNote)} onRequestClose={closeModal} contentLabel={viewedNote ? `View note: ${viewedNote.title}` : editor.type === "edit" ? "Edit note" : "New note"} className={viewedNote ? "note-modal note-modal-view" : "note-modal"} overlayClassName="note-modal-overlay">
        {viewedNote ? <ViewNote note={viewedNote} onClose={closeModal} onEdit={() => { setEditor({ isShown: true, type: "edit", data: viewedNote }); setViewedNoteId(null); }} /> : <AddEditNotes type={editor.type} noteData={editor.data} onclose={closeEditor} getALLNotes={getALLNotes} showToastMessage={showToastMessage} />}
      </Modal>
      <Toast isShown={toast.isShown} message={toast.message} type={toast.type} onclose={closeToast} />
    </div>
  );
};
export default Home;
