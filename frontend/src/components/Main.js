import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  
  const currentUser = React.useContext(CurrentUserContext);  

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" src={currentUser.avatar} alt="Фото пользователя" />
        <button className="profile__edit-avatar" aria-label="Кнопка обновления аватара" type="button" onClick={onEditAvatar}></button>
        <div className="profile__info">
          <div className="profile__fullname">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit" aria-label="Редактировать профиль" type="button" onClick={onEditProfile} ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add" type="button" aria-label="Добавить карточку" onClick={onAddPlace} ></button>
      </section>
      <section className="cards">
        {cards.map((card => {
          return (<Card card={card}
                        key={card._id}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        />)
        }))}
      </section>
    </main>
  );
}

export default Main;
