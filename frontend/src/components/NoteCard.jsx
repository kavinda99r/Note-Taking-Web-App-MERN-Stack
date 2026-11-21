import PropTypes from "prop-types";
import Icon from "./Icon";
const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onView,
  onEdit,
  onDelete,
  onPinNote
}) => {
  const parsedDate = new Date(date);
  const formattedDate = Number.isNaN(parsedDate.getTime()) ? "" : new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(parsedDate);
  return <article className={`min-w-0 relative min-h-[215px] flex flex-col p-[21px] border border-border rounded-[13px] bg-surface [transition:transform_.2s_ease,_box-shadow_.2s_ease,_border-color_.2s_ease] hover:border-primary hover:shadow-[0_0_0_2px_var(--color-primary-ring),_0_10px_28px_-12px_var(--color-primary-glow)] focus-within:border-primary focus-within:shadow-[0_0_0_2px_var(--color-primary-ring),_0_10px_28px_-12px_var(--color-primary-glow)] max-[600px]:min-h-[230px] motion-reduce:[transition:none] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 motion-reduce:hover:transform-none`}>
      <div className="flex justify-between items-start gap-3 mb-3 [&_>_button]:text-muted [&_>_button]:p-1 [&_>_button]:rounded-[5px] [&_>_button.is-active]:text-primary [&_>_button]:relative [&_>_button]:z-[2] [&_>_button]:shrink-0">
        <h2 className="min-w-0 text-[22px] leading-[1.2] font-semibold tracking-[-.5px]"><button className="w-full text-left text-ink [overflow-wrap:anywhere] line-clamp-2 overflow-hidden [&::after]:[content:''] [&::after]:absolute [&::after]:inset-0 [&::after]:rounded-[13px] [&::after]:cursor-pointer [&::after]:z-[1] focus-visible:!outline-none [&:focus-visible::after]:[outline:3px_solid_var(--color-primary)] [&:focus-visible::after]:[outline-offset:3px]" onClick={onView} aria-label={`View ${title}`}>{title}</button></h2>
        <Icon name={isPinned ? "pin-angle-fill" : "pin-angle"} label={isPinned ? "Unpin note" : "Pin note"} className={isPinned ? "is-active" : ""} onClick={onPinNote} />
      </div>
      <p className="line-clamp-2 text-[14px] leading-[1.5] text-muted whitespace-pre-wrap [overflow-wrap:anywhere] overflow-hidden text-ellipsis">{content}</p>
      <div className="note-tags">{tags.map((tag, index) => <span key={`${tag}-${index}`}>#{tag}</span>)}</div>
      <div className="mt-auto pt-[18px] flex items-center justify-between gap-2.5 [&_time]:text-[11px] [&_time]:text-muted [&_>_div]:flex [&_>_div]:gap-[7px] [&_button]:text-muted [&_button]:p-[5px] [&_button]:rounded-[5px] [&_button:hover]:text-primary [&_button:hover]:bg-soft [&_button.dashboard-delete:hover]:text-danger [&_button.dashboard-delete:hover]:bg-danger-soft [&_button]:relative [&_button]:z-[2] [&_button]:shrink-0"><time dateTime={Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString()}>{formattedDate}</time><div><Icon name="pencil" label="Edit note" onClick={onEdit} /><Icon name="trash" label="Delete note" className="dashboard-delete" onClick={onDelete} /></div></div>
    </article>;
};
NoteCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPinned: PropTypes.bool,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPinNote: PropTypes.func
};
export default NoteCard;
