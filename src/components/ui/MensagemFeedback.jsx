import React from 'react';

const MensagemFeedback = ({ mensagem, tipo, visivel, onClose }) => {
  if (!visivel) {
    return null;
  }

  const bgColor = tipo === 'sucesso' ? 'bg-accent' : 'bg-danger';

  return (
    <div 
      className={`fixed bottom-4 right-4 ${bgColor} text-white py-3 px-6 rounded-lg shadow-lg z-50 animate-fade-in-up`}
      onClick={onClose}
    >
      <div className="flex items-center">
        {tipo === 'sucesso' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {mensagem}
      </div>
    </div>
  );
};

export default MensagemFeedback;
