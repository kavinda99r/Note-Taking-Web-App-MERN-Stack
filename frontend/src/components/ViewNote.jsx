import PropTypes from "prop-types";

const styles = `
.note-view-header {
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}
.note-view-header h2 {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -.7px;
  overflow-wrap: anywhere;
  min-width: 0;
}
.note-view-header > button {
  flex-shrink: 0;
}
.note-view-date {
  display: block;
  font-size: 13px;
  color: var(--color-muted);
}
.note-view-content {
  color: var(--color-muted);
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.note-view {
  display: flex;
  flex-direction: column;
  min-height: min(320px, calc(100svh - 120px));
}
.note-view-header {
  display: block;
}
.note-view-header h2 {
  line-height: 1.2;
}
.note-view-date {
  margin-top: 5px;
}
.note-view-content {
  margin-top: 30px;
}
.note-view-tags {
  margin-top: 16px;
  margin-bottom: 12px;
}
.note-view-actions {
  border-top: 0;
  margin-top: auto;
  padding-top: 34px;
  gap: 9px;
}
.note-view-actions .button-primary {
  min-width: 122px;
  padding: var(--button-padding-y) var(--button-padding-x);
}
@media (max-width: 600px) {
  .note-view-header h2 {
  font-size: 26px;
}

}
@media (max-width: 600px) {
  .note-view-content {
  margin-top: 24px;
}

}
`;

const ViewNote = ({ note, onClose, onEdit }) => {
  const date = new Date(note.createOn);
  return (
    <article className="note-view">
      <style>{styles}</style>
      <header className="note-view-header"><h2>{note.title}</h2></header>
      {!Number.isNaN(date.getTime()) && <time className="note-view-date" dateTime={date.toISOString()}>{new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", year: "numeric" }).format(date)}</time>}
      <p className="note-view-content">{note.content}</p>
      {note.tags?.length > 0 && <div className="note-tags note-view-tags">{note.tags.map((tag, index) => <span key={`${tag}-${index}`}>#{tag}</span>)}</div>}
      <footer className="modal-actions note-view-actions"><button type="button" className="button-secondary" onClick={onClose}>Close</button><button type="button" className="button-primary" onClick={onEdit}>Edit Note</button></footer>
    </article>
  );
};
ViewNote.propTypes = { note: PropTypes.shape({ title: PropTypes.string, content: PropTypes.string, createOn: PropTypes.string, tags: PropTypes.arrayOf(PropTypes.string) }).isRequired, onClose: PropTypes.func.isRequired, onEdit: PropTypes.func.isRequired };
export default ViewNote;
