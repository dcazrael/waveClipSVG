import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ code, isOpen, onClose, children }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
      <div className='relative flex flex-col w-1/2 p-4 bg-white rounded-md'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-medium'>Wave Code</h2>
          <button className='focus:outline-none' onClick={onClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-4 h-4 text-gray-800 fill-current hover:text-purple-600'
            >
              <path d='M23.954 21.03l-9.184-9.095 9.092-9.174L21.03-.046l-9.09 9.179L2.764.045l-2.81 2.81L9.14 11.96.045 21.144l2.81 2.81 9.112-9.192 9.18 9.1z' />
            </svg>
          </button>
        </div>
        <textarea
          className='w-full p-2 mt-6 border border-gray-800 rounded h-28'
          ref={textAreaRef}
          value={code}
          readOnly
        />
        <button
          className='flex items-center self-end justify-center w-20 p-2 mt-6 font-bold transition duration-300 ease-in-out bg-purple-300 rounded focus:outline-none hover:bg-purple-600 hover:text-white'
          onClick={copyToClipboard}
        >
          Copy
        </button>
        {copySuccess && (
          <div className='absolute transform -translate-x-1/2 bg-purple-400 rounded top-3 left-1/2'>
            <div className='p-2 text-white '>Copied to Clipboard</div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
