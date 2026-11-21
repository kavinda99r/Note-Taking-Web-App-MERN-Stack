import PropTypes from "prop-types";
import Icon from "./Icon";

const styles = `
.dashboard-note {
  min-width: 0;
  position: relative;
  min-height: 215px;
  display: flex;
  flex-direction: column;
  padding: 21px;
  border: 1px solid var(--color-border);
  border-radius: 13px;
  background: var(--color-surface);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.dashboard-note:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-ring), 0 10px 28px -12px var(--color-primary-glow);
}
.dashboard-note:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-ring), 0 10px 28px -12px var(--color-primary-glow);
}
.dashboard-note-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}
.dashboard-note-top > button {
  color: var(--color-muted);
  padding: 4px;
  border-radius: 5px;
}
.dashboard-note-top > button.is-active {
  color: var(--color-primary);
}
.dashboard-note-open {
  width: 100%;
  text-align: left;
  color: var(--color-ink);
  overflow-wrap: anywhere;
}
.dashboard-note-bottom {
  margin-top: auto;
  padding-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.dashboard-note-bottom time {
  font-size: 11px;
  color: var(--color-muted);
}
.dashboard-note-bottom > div {
  display: flex;
  gap: 7px;
}
.dashboard-note-bottom button {
  color: var(--color-muted);
  padding: 5px;
  border-radius: 5px;
}
.dashboard-note-bottom button:hover {
  color: var(--color-primary);
  background: var(--color-soft);
}
.dashboard-note-bottom button.dashboard-delete:hover {
  color: var(--color-danger);
  background: var(--color-danger-soft);
}
@media (max-width: 600px) {
  .dashboard-note {
  min-height: 230px;
}

}
@media (prefers-reduced-motion: reduce) {
  .dashboard-note {
  transition: none;
}

}
.dashboard-note-title {
  min-width: 0;
  font-size: 22px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -.5px;
}
.dashboard-note-open {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.dashboard-note-open::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 13px;
  cursor: pointer;
  z-index: 1;
}
.dashboard-note-top > button {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}
.dashboard-note-bottom button {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}
.dashboard-note-open:focus-visible {
  outline: none !important;
}
.dashboard-note-open:focus-visible::after {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
}
.dashboard-note-preview {
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-muted);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (hover: hover) and (pointer: fine) {
  .dashboard-note:hover {
  transform: translateY(-4px);
}

}
@media (prefers-reduced-motion: reduce) {
  .dashboard-note:hover {
  transform: none;
}

}
`;

const NoteCard = ({ title, date, content, tags, isPinned, onView, onEdit, onDelete, onPinNote }) => {
  const parsedDate = new Date(date);
  const formattedDate = Number.isNaN(parsedDate.getTime()) ? "" : new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(parsedDate);
  return (
    <article className={`dashboard-note${isPinned ? " is-pinned" : ""}`}>
      <style>{styles}</style>
      <div className="dashboard-note-top">
        <h2 className="dashboard-note-title"><button className="dashboard-note-open" onClick={onView} aria-label={`View ${title}`}>{title}</button></h2>
        <Icon name={isPinned ? "pin-angle-fill" : "pin-angle"} label={isPinned ? "Unpin note" : "Pin note"} className={isPinned ? "is-active" : ""} onClick={onPinNote} />
      </div>
      <p className="dashboard-note-preview">{content}</p>
      <div className="note-tags">{tags.map((tag, index) => <span key={`${tag}-${index}`}>#{tag}</span>)}</div>
      <div className="dashboard-note-bottom"><time dateTime={Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString()}>{formattedDate}</time><div><Icon name="pencil" label="Edit note" onClick={onEdit} /><Icon name="trash" label="Delete note" className="dashboard-delete" onClick={onDelete} /></div></div>
    </article>
  );
};
NoteCard.propTypes = { title: PropTypes.string, date: PropTypes.string, content: PropTypes.string, tags: PropTypes.arrayOf(PropTypes.string).isRequired, isPinned: PropTypes.bool, onView: PropTypes.func.isRequired, onEdit: PropTypes.func, onDelete: PropTypes.func, onPinNote: PropTypes.func };
export default NoteCard;
