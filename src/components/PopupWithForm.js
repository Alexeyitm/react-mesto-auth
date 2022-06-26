import React from "react";

function PopupWithForm({ name, title, textButton, isOpen, onClose, onSubmit, children }) {
  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div
        className={`popup__container popup__container_${name} container`}
      >
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <h2 className="popup__title">{title}</h2>
          <form
            onSubmit={onSubmit}
            className={`popup__form popup__form_${name}`}
            name="Form"
            noValidate
          >
            {children}
            <button
              className={`popup__button-add popup__button-add_${name}`}
              type="submit"
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
