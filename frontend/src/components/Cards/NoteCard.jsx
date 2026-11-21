import PropTypes from "prop-types";
import Icon from "../Icon/Icon";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <>
      <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(new Date(date))}
            </span>
          </div>

          <Icon name="pin-angle" label="Toggle pin"
            className={`icon-btn ${
              isPinned ? "text-primary" : "text-slate-300"
            }`}
            onClick={onPinNote}
          />
        </div>

        <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-slate-500">
            {tags.map((item) => `#${item}`)}
          </div>

          <div className="flex items-center gap-2">
            <Icon name="pencil" label="Edit note"
              className="icon-btn hover:text-green-600"
              onClick={onEdit}
            />
            <Icon name="trash" label="Delete note"
              className="icon-btn hover:text-red-500"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPinned: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPinNote: PropTypes.func
};

export default NoteCard;
