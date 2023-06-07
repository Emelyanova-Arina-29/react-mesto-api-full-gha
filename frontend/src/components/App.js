import React, { useState, useEffect } from 'react';
import Header from './Header';
import api from '../utils/Api';
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { register, login, checkToken } from '../utils/ApiAuth';
import imageCheckmark from '../images/checkmark.svg';
import imageCross from '../images/cross.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [popupStatus, setPopupStatus] = useState({ image: "", meassage: "" });
  const [isEmailValue, setIsEmailValue] = useState(null);

  const navigate = useNavigate();

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  // Регистрация

  function handleRegister(email, password) {
    register(email, password)
      .then(() => {
        setPopupStatus({
          image: imageCheckmark,
          message: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in");
      })
      .catch(() => {
        setPopupStatus({
          image: imageCross,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(handleInfoTooltip);
  }

  // Вход в систему

  function handleLogin(email, password) {
    login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsEmailValue(email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        setPopupStatus({
          image: imageCross,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltip();
      });
  }

  // Выход из системы

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setIsEmailValue("");
    setIsLoggedIn(false);
    navigate("sign-in");
  }

  // Проверка токена

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsEmailValue(res.data.email);
            setIsLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`));
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`));
    }
  }, [isLoggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard();
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .addLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
        });
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    title="Выйти"
                    route=""
                    email={isEmailValue}
                    onClick={handleLogOut}
                  />
                  <ProtectedRoute
                    path="/"
                    component={Main}
                    isLoggedIn={isLoggedIn}
                    onEditProfile={() => setIsEditProfilePopupOpen(true)}
                    onAddPlace={() => setIsAddPlacePopupOpen(true)}
                    onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                    onCardClick={(card) => setSelectedCard(card)}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header title="Войти" route="/sign-in" />
                  <Register onRegister={handleRegister} />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header title="Регистрация" route="/sign-up" />
                  <Login onLogin={handleLogin} />
                </>
              }
            />
            <Route
              path="*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            popupStatus={popupStatus}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
