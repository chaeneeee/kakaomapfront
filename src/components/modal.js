import React from 'react';
import './modal.css';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="modal-body">
          {children}
        </div>
        <button className="modal-close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
