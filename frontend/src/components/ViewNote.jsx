import PropTypes from "prop-types";
const ViewNote = ({
  note,
  onClose,
  onEdit
}) => {
  const date = new Date(note.createOn);
  return <article className="flex flex-col min-h-[min(320px,_calc(100svh_-_120px))]">
      <header className="items-start justify-between gap-5 [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:tracking-[-.7px] [&_h2]:[overflow-wrap:anywhere] [&_h2]:min-w-0 [&_>_button]:shrink-0 block [&_h2]:leading-[1.2] max-[600px]:[&_h2]:text-[26px]"><h2>{note.title}</h2></header>
      {!Number.isNaN(date.getTime()) && <time className="block text-[13px] text-muted mt-[5px]" dateTime={date.toISOString()}>{new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(date)}</time>}
      <p className="text-muted text-[16px] leading-[1.5] whitespace-pre-wrap [overflow-wrap:anywhere] mt-[30px] max-[600px]:mt-6">{note.content}</p>
      {note.tags?.length > 0 && <div className="note-tags mt-4 mb-3">{note.tags.map((tag, index) => <span key={`${tag}-${index}`}>#{tag}</span>)}</div>}
      <footer className="modal-actions border-t-0 mt-auto pt-[34px] gap-[9px] [&_.button-primary]:min-w-[122px] [&_.button-primary]:py-[var(--button-padding-y)] [&_.button-primary]:px-[var(--button-padding-x)]"><button type="button" className="button-secondary" onClick={onClose}>Close</button><button type="button" className="button-primary" onClick={onEdit}>Edit Note</button></footer>
    </article>;
};
ViewNote.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    createOn: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};
export default ViewNote;
