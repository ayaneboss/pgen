import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl p-1 -m-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="p-5 sm:p-6 overflow-y-auto">
          {children}
        </div>
        <div className="p-4 border-t border-gray-200 text-right bg-gray-50">
            <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};