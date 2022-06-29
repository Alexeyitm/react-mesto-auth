import React from 'react';
import yes from '../image/yes.png'
import no from '../image/no.png'

function InfoTooltip({ isRegistration }) {
  return (
    <div className='infotool'>
      <div className='infotool__background'></div>
      <div className='infotool__container'>
        <button
          className='infotool__button-close'
          type='button'
        ></button>
        <img 
          className='infotool__img'
          alt='Статус'
          src={isRegistration ? yes : no}
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

export default InfoTooltip;