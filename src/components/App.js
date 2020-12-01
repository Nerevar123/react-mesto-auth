import React from "react";
import { Router, Route, Switch, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PageNotFound from "./PageNotFound";
import ClosablePopup from "./hocs/ClosablePopup";
import ProtectedRoute from "./hocs/ProtectedRoute";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api, authApi } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormWithValidation from "../hooks/useFormWithValidation";

function App() {
  const history = useHistory();
  const validation = useFormWithValidation();
  const [currentUser, setCurrentUser] = React.useState();
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmClick] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterClick] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [isSaving, setIsSaving] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [username, setUsername] = React.useState();
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getInitCards(), api.getUserInfo(), handleTokenCheck()])
      .then(([cards, user]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleDeleteClick(card) {
    setConfirmClick(true);
    setDeletedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleRegisterClick() {
    if (isSuccess) {
      history.push("/sign-in");
    }
    closeAllPopups();
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/login");
  }

  function handleAuthorize(user) {
    authApi
      .authorize(user)
      .then((data) => {
        if (data.token) {
          handleLogin();
          setUsername(user.email);
          history.push("/");
        }
      })
      .catch((err) => {
        if (err === "Incorrect email address or password") {
          validation.setErrors({ submit: "Неверный логин или пароль" });
        } else {
          validation.setErrors({ submit: err });
        }
        console.log(err);
      });
  }

  function handleRegister(user) {
    authApi
      .register(user)
      .then(() => {
        setIsSuccess(true);
        setRegisterClick(true);
      })
      .catch((err) => {
        setRegisterClick(true);
        validation.setErrors({ submit: err });
        console.log(err);
      });
  }

  function handleTokenCheck() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      authApi
        .checkToken(token)
        .then((res) => {
          setUsername(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    setIsSaving(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleUpdateUser(user) {
    setIsSaving(true);
    api
      .patchUserInfo(user)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar(avatar) {
    setIsSaving(true);
    api
      .patchAvatar(avatar)
      .then((avatar) => setCurrentUser(avatar))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleAddPlaceSubmit(card) {
    setIsSaving(true);
    api
      .addCard(card)
      .then((card) => setCards([card, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function closeAllPopups() {
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setEditAvatarClick(false);
    setConfirmClick(false);
    setRegisterClick(false);
    setSelectedCard({});
    setDeletedCard({});
    setIsSaving(false);
    setTimeout(() => {
      setIsSuccess(false);
    }, 500);
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Router history={history} basename="/">
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
              <>
                <Header
                  button="isLogged"
                  username={username}
                  onLogout={handleLogout}
                />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onDeleteClick={handleDeleteClick}
                />
                <Footer />
              </>
            </ProtectedRoute>
            <Route exact path="/sign-up">
              <>
                <Header button="login" />
                <Register
                  validation={validation}
                  onRegister={handleRegister}
                  isOpen={isRegisterPopupOpen}
                  onClose={handleRegisterClick}
                  isSuccess={isSuccess}
                />
              </>
            </Route>
            <Route exact path="/sign-in">
              <>
                <Header button="register" />
                <Login onAuthorize={handleAuthorize} validation={validation} />
              </>
            </Route>
            <Route path="*">
              <Header button="notFound" />
              <PageNotFound />
            </Route>
          </Switch>
          {isEditProfilePopupOpen && (
            <ClosablePopup>
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isSaving={isSaving}
                validation={validation}
              />
            </ClosablePopup>
          )}
          {isAddPlacePopupOpen && (
            <ClosablePopup>
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isSaving={isSaving}
                validation={validation}
              />
            </ClosablePopup>
          )}
          {isEditAvatarPopupOpen && (
            <ClosablePopup>
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isSaving={isSaving}
                validation={validation}
              />
            </ClosablePopup>
          )}
          {selectedCard.link && (
            <ClosablePopup>
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </ClosablePopup>
          )}
          {isConfirmPopupOpen && (
            <ClosablePopup>
              <ConfirmPopup
                isOpen={isConfirmPopupOpen}
                onClose={closeAllPopups}
                onConfirm={handleCardDelete}
                isSaving={isSaving}
              />
            </ClosablePopup>
          )}
        </Router>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
