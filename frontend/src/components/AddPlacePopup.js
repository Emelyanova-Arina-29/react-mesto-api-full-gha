import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState({});
  const [link, setLink] = React.useState({});

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]); 

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(e) {
    
    e.preventDefault();
  
    props.onAddPlace({
      name,
      link,
    });
  } 

  return (
    <PopupWithForm
          name="popup_type_create"
          title="Новое место"
          isOpen={props.isOpen}
          textButton="Создать"
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <label className="popup__label">
            <input className="popup__input popup__input_type_title" 
            type="text" 
            value={name} 
            onChange={handleChangeName}  
            name="name" 
            id="titleImage" 
            placeholder="Название" 
            minLength="2" maxLength="30" required />
            <span className="titleImage-error popup__input-error"></span>
          </label>
          <label className="popup__label">
            <input className="popup__input popup__input_type_link" 
            type="url" 
            value={link} 
            onChange={handleChangeLink} 
            name="link" 
            id="linkImage" 
            placeholder="Ссылка на картинку" 
            required />
            <span className="linkImage-error popup__input-error"></span>
          </label>
        </PopupWithForm>
  );
}

export default AddPlacePopup;

