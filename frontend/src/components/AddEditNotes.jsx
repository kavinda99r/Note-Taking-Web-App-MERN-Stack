import PropTypes from "prop-types";
import Icon from "./Icon";
import { useState } from "react";
import TagInput from "./TagInput";
import axiosInstance from "../utils/axiosInstance";

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
      <div className="note-editor-header"><div><h2>{type === "edit" ? "A little refinement." : "A fresh thought."}</h2><p>{type === "edit" ? "Make this note a little more you." : "Big or small, every idea belongs here."}</p></div><button type="button" className="note-editor-close" onClick={onclose} aria-label="Close note editor"><Icon name="x-lg" /></button></div>
      <div className="note-editor-field"><label htmlFor="note-title">Title</label><input id="note-title" placeholder="Give your thought a title" value={title} onChange={({ target }) => setTitle(target.value)} required autoFocus /></div>
      <div className="note-editor-field"><label htmlFor="note-content">Your note</label><textarea id="note-content" placeholder="What’s on your mind?" rows={6} value={content} onChange={({ target }) => setContent(target.value)} required /></div>
      <div className="note-editor-tags"><span className="note-editor-tag-label">Tags</span><TagInput tags={tags} setTags={setTags} /></div>
      {error && <p className="note-editor-error" role="alert">{error}</p>}
      <div className="note-editor-actions"><button type="button" className="note-editor-cancel" onClick={onclose}>Cancel</button><button className="dashboard-primary" type="submit" disabled={saving}>{saving ? "Saving…" : type === "edit" ? "Save changes" : "Create note"}</button></div>
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
