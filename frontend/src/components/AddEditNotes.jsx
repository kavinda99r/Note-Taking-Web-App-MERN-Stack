import PropTypes from "prop-types";
import Icon from "./Icon";
import { useState } from "react";
import TagInput from "./TagInput";
import axiosInstance from "../utils/axiosInstance";

const styles = `
.note-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 26px;
}
.note-editor-header h2 {
  font-size: 25px;
  color: var(--color-ink);
  font-weight: 600;
  letter-spacing: -.7px;
}
.note-editor-header p {
  color: var(--color-muted);
  font-size: 14px;
  margin-top: 6px;
}
.note-editor-close {
  padding: 10px;
  color: var(--color-muted);
  background: var(--color-soft);
  border-radius: 8px;
}
.note-editor-tag-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-ink);
  margin-bottom: 8px;
}
.note-editor-tags {
  margin-top: 20px;
}
.note-editor-tags input {
  border: 1px solid var(--color-border);
  background: white;
  border-radius: 7px;
  padding: 9px 12px;
  flex: 1;
  min-width: 0;
  font-size: 14px;
}
.note-editor-tags button {
  border-radius: 7px;
}
@media (max-width: 600px) {
  .note-editor-header h2 {
  font-size: 23px;
}

}
`;

const AddEditNotes = ({
  noteData,
  getALLNotes,
  type,
  onclose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async (event) => {
    event.preventDefault();
    if (saving) return;
    if (!title.trim() || !content.trim()) {
      setError("Please add a title and some content.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = { title, content, tags };
      const response = type === "edit"
        ? await axiosInstance.put("/edit-note/" + noteData._id, payload)
        : await axiosInstance.post("/add-note", payload);
      if (!response.data.note) throw new Error("Unable to save the note.");
      showToastMessage(type === "edit" ? "Note updated" : "Note added to your notebook");
      getALLNotes();
      onclose();
    } catch (failure) {
      setError(failure.response?.data?.message || "Unable to save the note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="note-editor" onSubmit={handleSave} aria-busy={saving}>
      <style>{styles}</style>
      <div className="note-editor-header"><div><h2>{type === "edit" ? "A little refinement." : "A fresh thought."}</h2><p>{type === "edit" ? "Make this note a little more you." : "Big or small, every idea belongs here."}</p></div><button type="button" className="note-editor-close" onClick={onclose} aria-label="Close note editor"><Icon name="x-lg" /></button></div>
      <div className="form-field"><label htmlFor="note-title">Title</label><input id="note-title" placeholder="Give your thought a title" value={title} onChange={({ target }) => setTitle(target.value)} required autoFocus /></div>
      <div className="form-field"><label htmlFor="note-content">Your note</label><textarea id="note-content" placeholder="What’s on your mind?" rows={6} value={content} onChange={({ target }) => setContent(target.value)} required /></div>
      <div className="note-editor-tags"><span className="note-editor-tag-label">Tags</span><TagInput tags={tags} setTags={setTags} /></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-actions"><button type="button" className="button-secondary" onClick={onclose}>Cancel</button><button className="button-primary" type="submit" disabled={saving}>{saving ? "Saving…" : type === "edit" ? "Save changes" : "Create note"}</button></div>
    </form>
  );
};

AddEditNotes.propTypes = {
  noteData: PropTypes.shape({ _id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string) }),
  getALLNotes: PropTypes.func.isRequired,
  type: PropTypes.string,
  onclose: PropTypes.func.isRequired,
  showToastMessage: PropTypes.func.isRequired
};

export default AddEditNotes;
