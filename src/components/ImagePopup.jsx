import React from 'react';

function ImagePopup({ card, onClose }) {

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
  
  return (
    <div 
      className={`popup popup_image ${card.link && 'popup_opened'}`}
      onClick={handleClickOverlay}
    >
      <figure className='popup__figure container'>
        <button
          className='popup__button-close'
          type='button'
          onClick={onClose}
        ></button>
        <img
          className='popup__picture'
          src={card.link}
          alt={card.name}
        />
        <figcaption className='popup__figcaption'>
          {card.name}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
