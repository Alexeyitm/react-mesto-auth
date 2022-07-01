import React from 'react';
import success from '../image/yes.png'
import wrong from '../image/no.png'

function InfoPopup({ isOpen, onClose, isRegistration }) {
  return (
    <div className={`popup-info ${isOpen && 'popup-info_opened'}`}>
      <div className='popup-info__background'></div>
      <div className='popup-info__container'>
        <button
          onClick={onClose}
          className='popup-info__button-close'
          type='button'
        ></button>
        <img 
          className='popup-info__img'
          alt='Статус'
          src={isRegistration ? success : wrong}
          />
        <h2 className='popup-info__text'>
          {isRegistration ? 
          'Вы успешно зарегистрировались!' : 
          'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  )
};

export default InfoPopup;