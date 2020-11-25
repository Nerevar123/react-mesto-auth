import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ClosablePopup from "./hocs/ClosablePopup";
import ProtectedRoute from "./hocs/ProtectedRoute";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState();
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmClick] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [isSaving, setIsSaving] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  React.useEffect(() => {
    Promise.all([api.getInitCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
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
    setSelectedCard({});
    setDeletedCard({});
    setIsSaving(false);
  }

  function handleLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <HashRouter basename="/">
          <Header />
          <Switch>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
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
            </ProtectedRoute>
          </Switch>
          {isEditProfilePopupOpen ? (
            <ClosablePopup>
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isSaving={isSaving}
              />
            </ClosablePopup>
          ) : (
            ""
          )}
          {isAddPlacePopupOpen ? (
            <ClosablePopup>
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isSaving={isSaving}
              />
            </ClosablePopup>
          ) : (
            ""
          )}
          {isEditAvatarPopupOpen ? (
            <ClosablePopup>
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isSaving={isSaving}
              />
            </ClosablePopup>
          ) : (
            ""
          )}
          {selectedCard.link ? (
            <ClosablePopup>
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </ClosablePopup>
          ) : (
            ""
          )}
          {isConfirmPopupOpen ? (
            <ClosablePopup>
              <ConfirmPopup
                isOpen={isConfirmPopupOpen}
                onClose={closeAllPopups}
                onConfirm={handleCardDelete}
                isSaving={isSaving}
              />
            </ClosablePopup>
          ) : (
            ""
          )}
        </HashRouter>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
