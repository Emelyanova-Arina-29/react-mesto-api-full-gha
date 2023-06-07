import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `card__delete ${!isOwn && 'card__delete_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `card__like ${isLiked && 'card__like_active'}` 
  );

  function handleCardClick() {
    onCardClick(card);
  } 

  function handleLikeClick() {
    onCardLike(card);
  } 

  function handleDeleteClick() {
    onCardDelete(card);
  } 

  return (
    <article className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку"></button>
      <div className="card__inscription">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк"></button>
          <p className="card__number-like">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;