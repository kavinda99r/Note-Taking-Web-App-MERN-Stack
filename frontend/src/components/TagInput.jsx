import PropTypes from "prop-types";
import Icon from "./Icon";
import { useState } from "react";

const styles = `
.tag-input-chip {
  background: var(--color-soft);
  color: var(--color-primary);
}
.tag-input-add {
  border: 1px solid var(--color-accent-muted);
  color: var(--color-primary);
  background: var(--color-soft);
  transition: background .15s, color .15s;
}
.tag-input-add:hover {
  background: var(--color-primary);
  color: white;
}
`;

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <style>{styles}</style>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="tag-input-chip flex items-center gap-2 text-sm px-3 py-1 rounded"
            >
              # {tag}
              <button type="button"
                aria-label={`Remove tag ${tag}`}
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <Icon name="x-lg" label="Close" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border py-2 rounded outline-none"
          placeholder="Add a tag"
          aria-label="New tag"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button type="button"
          aria-label="Add tag"
          className="tag-input-add w-8 h-8 flex items-center justify-center rounded"
          onClick={addNewTag}
        >
          <Icon name="plus-lg" label="Add" className="text-xl" />
        </button>
      </div>
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired
};

export default TagInput;
