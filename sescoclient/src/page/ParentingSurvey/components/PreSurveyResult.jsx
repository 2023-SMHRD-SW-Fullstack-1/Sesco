import React from 'react';

function PreSurveyResult({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
        {children}
      </div>
    </div>
  );
}

export default PreSurveyResult;