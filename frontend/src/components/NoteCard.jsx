import PropTypes from "prop-types";
import Icon from "./Icon";
const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  const parsedDate = new Date(date);
  const formattedDate = Number.isNaN(parsedDate.getTime()) ? "" : new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(parsedDate);
  return (
    <article className={`dashboard-note${isPinned ? " is-pinned" : ""}`}>
      <div className="dashboard-note-top"><span>{isPinned ? "PINNED THOUGHT" : "A LITTLE THOUGHT"}</span><Icon name={isPinned ? "pin-angle-fill" : "pin-angle"} label={isPinned ? "Unpin note" : "Pin note"} className={isPinned ? "is-active" : ""} onClick={onPinNote} /></div>
      <button className="dashboard-note-open" onClick={onEdit} aria-label={`Edit ${title}`}><h2>{title}</h2><p>{content}</p></button>
      <div className="dashboard-note-tags">{tags.map((tag, index) => <span key={`${tag}-${index}`}>#{tag}</span>)}</div>
      <div className="dashboard-note-bottom"><time dateTime={Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString()}>{formattedDate}</time><div><Icon name="pencil" label="Edit note" onClick={onEdit} /><Icon name="trash" label="Delete note" className="dashboard-delete" onClick={onDelete} /></div></div>
    </article>
  );
};
NoteCard.propTypes = { title: PropTypes.string, date: PropTypes.string, content: PropTypes.string, tags: PropTypes.arrayOf(PropTypes.string).isRequired, isPinned: PropTypes.bool, onEdit: PropTypes.func, onDelete: PropTypes.func, onPinNote: PropTypes.func };
export default NoteCard;
