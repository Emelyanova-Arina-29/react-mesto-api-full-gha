import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <form className="popup__form" onSubmit={props.onSubmit} name={props.name}>
          <button className="popup__close" type="button" aria-label="Закрыть форму" onClick={props.onClose} />
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type="submit" aria-label={props.textButton}>{props.textButton}</button>
        </form>
    </div>
  );
}

export default PopupWithForm;

