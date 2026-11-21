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
  showToastMessage
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const handleSave = async event => {
    event.preventDefault();
    if (saving) return;
    if (!title.trim() || !content.trim()) {
      setError("Please add a title and some content.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        title,
        content,
        tags
      };
      const response = type === "edit" ? await axiosInstance.put("/edit-note/" + noteData._id, payload) : await axiosInstance.post("/add-note", payload);
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
  return <form className="" onSubmit={handleSave} aria-busy={saving}>
      <div className="flex justify-between items-center gap-5 mb-[26px] [&_h2]:text-[25px] [&_h2]:text-ink [&_h2]:font-semibold [&_h2]:tracking-[-.7px] [&_p]:text-muted [&_p]:text-[14px] [&_p]:mt-1.5 max-[600px]:[&_h2]:text-[23px]"><div><h2>{type === "edit" ? "A little refinement." : "A fresh thought."}</h2><p>{type === "edit" ? "Make this note a little more you." : "Big or small, every idea belongs here."}</p></div><button type="button" className="p-2.5 text-muted bg-soft rounded-[8px]" onClick={onclose} aria-label="Close note editor"><Icon name="x-lg" /></button></div>
      <div className="form-field"><label htmlFor="note-title">Title</label><input id="note-title" placeholder="Give your thought a title" value={title} onChange={({
        target
      }) => setTitle(target.value)} required autoFocus /></div>
      <div className="form-field"><label htmlFor="note-content">Your note</label><textarea id="note-content" placeholder="What’s on your mind?" rows={6} value={content} onChange={({
        target
      }) => setContent(target.value)} required /></div>
      <div className="mt-5 [&_input]:border [&_input]:border-border [&_input]:bg-white [&_input]:rounded-[7px] [&_input]:py-[9px] [&_input]:px-3 [&_input]:flex-1 [&_input]:min-w-0 [&_input]:text-[14px] [&_button]:rounded-[7px]"><span className="block text-[13px] font-medium text-ink mb-2">Tags</span><TagInput tags={tags} setTags={setTags} /></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-actions"><button type="button" className="button-secondary" onClick={onclose}>Cancel</button><button className="button-primary" type="submit" disabled={saving}>{saving ? "Saving…" : type === "edit" ? "Save changes" : "Create note"}</button></div>
    </form>;
};
AddEditNotes.propTypes = {
  noteData: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  getALLNotes: PropTypes.func.isRequired,
  type: PropTypes.string,
  onclose: PropTypes.func.isRequired,
  showToastMessage: PropTypes.func.isRequired
};
export default AddEditNotes;
