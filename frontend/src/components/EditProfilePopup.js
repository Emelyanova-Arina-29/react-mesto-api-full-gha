import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = React.useState({});
  const [description, setDescription] = React.useState({});
  
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    
    e.preventDefault();
  
    props.onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
          name="popup_type_edit"
          title="Редактировать профиль"
          isOpen={props.isOpen}
          textButton="Сохранить"
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <label className="popup__label">
            <input className="popup__input popup__input_type_name" 
            type="text" 
            value={name} 
            onChange={handleChangeName} 
            name="inputNameProfile" 
            id="nameProfile" 
            placeholder="Имя" 
            minLength="2" maxLength="40" required />
            <span className="nameProfile-error popup__input-error"></span>
          </label>
          <label className="popup__label">
            <input className="popup__input popup__input_type_description" 
            type="text" 
            value={description} 
            onChange={handleChangeDescription} 
            name="inputDescriptionProfile" 
            id="descriptionProfile" 
            placeholder="Вид деятельности" 
            minLength="2" maxLength="200" required />
            <span className="descriptionProfile-error popup__input-error"></span>
          </label>
        </PopupWithForm>
  );
}

export default EditProfilePopup;

