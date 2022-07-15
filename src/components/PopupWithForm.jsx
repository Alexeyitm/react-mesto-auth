import React from 'react';

function PopupWithForm({ name, title, textButton, isOpen, onClose, onSubmit, children }) {

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} onClick={handleClickOverlay}>
      <div
        className={`popup__container popup__container_${name} container`}
      >
        <button
          className='popup__button-close'
          type='button'
          onClick={onClose}
        ></button>
        <div className='popup__content'>
          <h2 className='popup__title'>{title}</h2>
          <form
            onSubmit={onSubmit}
            className={`popup__form popup__form_${name}`}
            name={name}
          >
            {children}
            <button
              className={`popup__button-add popup__button-add_${name}`}
              type='submit'
            >
              {textButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
