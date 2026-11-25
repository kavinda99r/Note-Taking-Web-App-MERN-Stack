import PropTypes from "prop-types";
import Modal from "react-modal";

const DeleteNoteModal = ({ note, isDeleting, error, onCancel, onConfirm }) => (
  <Modal
    isOpen={Boolean(note)}
    onRequestClose={onCancel}
    shouldCloseOnEsc={!isDeleting}
    shouldCloseOnOverlayClick={!isDeleting}
    role="alertdialog"
    aria={{ labelledby: "delete-note-title", describedby: "delete-note-description", busy: isDeleting }}
    className="w-full max-w-[440px] max-h-[calc(100svh-48px)] overflow-y-auto rounded-[18px] border border-border bg-surface p-7 shadow-[0_30px_80px_#2a1a0e33] outline-none max-[600px]:p-6"
    overlayClassName="fixed inset-0 z-[110] flex items-center justify-center bg-[#2a1a0e24] p-6 backdrop-blur-[4px] max-[600px]:p-3.5"
  >
    {note && <>
      <h2 id="delete-note-title" className="text-2xl font-semibold tracking-tight text-ink">Delete this note?</h2>
      <p id="delete-note-description" className="mt-3 break-words text-[15px] leading-relaxed text-muted">
        <span className="font-medium text-ink">“{note.title}”</span> will be permanently deleted. This cannot be undone.
      </p>
      {error && <p className="form-error mt-5" role="alert">{error}</p>}
      <div className="mt-7 flex justify-end gap-3">
        <button type="button" className="button-secondary" onClick={onCancel} disabled={isDeleting} autoFocus>Cancel</button>
        <button type="button" className="button-danger solid" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? "Deleting…" : "Delete note"}
        </button>
      </div>
    </>}
  </Modal>
);

DeleteNoteModal.propTypes = {
  note: PropTypes.shape({ title: PropTypes.string }),
  isDeleting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteNoteModal;
