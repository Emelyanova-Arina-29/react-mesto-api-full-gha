import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const ref = React.useRef('');
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: ref.current.value
    });
  } 

  React.useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]); 

  return (
    <PopupWithForm
          name="popup_type_avatar"
          title="Обновить аватар"
          isOpen={props.isOpen}
          textButton="Сохранить"
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <label className="popup__label">
            <input className="popup__input popup__input_type_avatar" 
            ref={ref}
            type="url" 
            defaultValue="" 
            name="inputAvatar" 
            id="linkNewAvatar" 
            placeholder="Ссылка на аватар" required />
            <span className="linkNewAvatar-error popup__input-error"></span>
          </label>
        </PopupWithForm>
  );
}

export default EditAvatarPopup;

