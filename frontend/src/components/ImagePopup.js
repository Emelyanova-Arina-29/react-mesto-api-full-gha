import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_blackout popup_type_view ${card && 'popup_opened'}`}>
        <figure className="popup__figure">
          <button className="popup__close" type="button" aria-label="Закрыть форму" onClick={onClose}></button>
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
      </div>
  );
}

export default ImagePopup;