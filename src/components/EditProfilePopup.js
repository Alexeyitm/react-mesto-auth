import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from "../context/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSaving }) {
  const currentUser = useContext(CurrentUserContext);
  
  const [name, setName] =  useState('');
  const [description, setDescription] =  useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName('');
    setDescription('');
  }, [isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="user"
      title="Редактировать профиль"
      textButton={isSaving ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChangeName}
        defaultValue={currentUser.name}
        id="name"
        className="popup__input popup__input_field_name"
        type="text"
        name="Name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        id="name-error"
        className="popup__input-error popup__input-error_number_one"
      ></span>
      <input
        onChange={handleChangeDescription}
        defaultValue={currentUser.about}
        id="job"
        className="popup__input popup__input_field_job"
        type="text"
        name="Job"
        placeholder="Профессиональная деятельность"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        id="job-error"
        className="popup__input-error popup__input-error_number_two"
      ></span>
    </PopupWithForm>
  )
};

export default EditProfilePopup;