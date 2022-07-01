import React from 'react';
import success from '../image/yes.png'
import wrong from '../image/no.png'

function InfoPopup({ isOpen, onClose, isRegistration }) {
  return (
    <div className={`infotool ${isOpen && 'infotool_opened'}`}>
      <div className='infotool__background'></div>
      <div className='infotool__container'>
        <button
          onClick={onClose}
          className='infotool__button-close'
          type='button'
        ></button>
        <img 
          className='infotool__img'
          alt='Статус'
          src={isRegistration ? success : wrong}
          />
        <h2 className='infotool__text'>
          {isRegistration ? 
          'Вы успешно зарегистрировались!' : 
          'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  )
};

export default InfoPopup;