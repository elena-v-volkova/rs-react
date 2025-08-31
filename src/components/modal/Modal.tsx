import './style.css';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
