import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSaving }) {
  const [place, setPlace] =  useState('');
  const [link, setLink] =  useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      place: place,
      link: link,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setPlace('');
      setLink('');
    }, 500);
  }, [isOpen]);

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
            name='card'
            title='Новое место'
            textButton={isSaving ? 'Создание...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
          >
            <input
              onChange={handleChangePlace}
              value={place}
              id='place'
              className='popup__input popup__input_field_place'
              type='text'
              name='Place'
              minLength='2'
              maxLength='30'
              placeholder='Название'
              required
            />
            <span
              id='place-error'
              className='popup__input-error popup__input-error_number_one'
            ></span>
            <input
              onChange={handleChangeLink}
              value={link}
              id='link'
              className='popup__input popup__input_field_link'
              type='url'
              name='Link'
              placeholder='Ссылка на картинку'
              required
            />
            <span
              id='link-error'
              className='popup__input-error popup__input-error_number_two'
            ></span>
          </PopupWithForm>
  )
};

export default AddPlacePopup;