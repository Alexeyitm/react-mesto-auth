import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Error from './Error';
import ImagePopup from './ImagePopup';
import InfoPopup from './InfoPopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from  './DeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import CurrentUserContext from '../context/CurrentUserContext';

function App() {
  const history = useHistory();

  const [currentUser, setUser] =  useState({});
  const [currentCards, setCards] =  useState([]);
  const [isEditAvatarPopupOpen, setIsAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setIsPlacePopup] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopup] = useState(false);
  const [isDeleteCardPopupOpen, deleteIsCardPopup] = useState({isOpen: false, card: {}});
  const [selectedCard, setIsSelectedCard] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const [isRegistration, setIsRegistration] = useState(false);
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([user, items]) => {
        setUser(user);
        setCards(items);
        tokenCheck();
      })
      .catch((err) => console.log(err));
  }, []);

  function handleClickEditAvatar() {
    setIsAvatarPopup(true);
  }

  function handleClickEditProfile() {
    setIsProfilePopup(true);
  }

  function handleClickAddPlace() {
    setIsPlacePopup(true);
  }

  function handleClickDeleteCard(card) {
    deleteIsCardPopup({isOpen: true, card: card});  
  }

  function handleCardClick(card) {
    setIsSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAvatarPopup(false);
    setIsProfilePopup(false);
    setIsPlacePopup(false);
    setIsInfoPopup(false);
    deleteIsCardPopup({isOpen: false, card: {}});
    setIsSelectedCard({});
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(picture) {
    setIsSaving(true);
    api
      .setAvatar(picture)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => console.log(err))
      .finally(closeAllPopups);
  }

  function handleUpdateUser(user) {
    setIsSaving(true);
    api
      .setUser(user)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => console.log(err))
      .finally(closeAllPopups);
  }

  function handleAddPlaceSubmit(card) {
    setIsSaving(true);
    api
      .setCard(card)
      .then((newCard) => {
        setCards([newCard, ...currentCards]); 
      })
      .catch((err) => console.log(err))
      .finally(closeAllPopups);
  }

  function handleCardDelete(card) {
    setIsSaving(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));   
      })
      .catch((err) => console.log(err))
      .finally(closeAllPopups);
  }

  function handleRegistration(data) {
    auth
      .registration(data)
      .then((res) => {
        if (res){
          history.push('/signin');
          setIsRegistration(true);
        } else {
          setIsRegistration(false);
        }
      })
      .finally(setIsInfoPopup(true))
      .catch((err) => console.log(err))
  }
  
  function handleAuthorization(data) {
    auth
      .authorization(data)
      .then((token) => {
        if (token){
          localStorage.setItem('jwt', token);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => console.log(err))
  }

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    if (jwt){
      auth
        .getContent(jwt).then((res) => {
          if (res){
            console.log(res)
          }
        }); 
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className='content'>

          <Header handleSignOut={handleSignOut}/>

          <Switch>
            <ProtectedRoute
              exact
              path='/'
              loggedIn={loggedIn}
              component={Main}
              cards={currentCards}
              onEditAvatar={handleClickEditAvatar}
              onEditProfile={handleClickEditProfile}
              onCardLike={handleCardLike}
              onCardDelete={handleClickDeleteCard}
              onAddPlace={handleClickAddPlace}
              handleCardClick={handleCardClick}
              setCards={setCards}
            />
            <Route exact path='/signin'>
              <Login handleAuthorization={handleAuthorization}/>
            </Route>
            <Route exact path='/signup'>
              <Register handleRegistration={handleRegistration}/>
            </Route>
            <Route path='/*'>
              <Error />
            </Route>
          </Switch>

          <Footer />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isSaving={isSaving}
          />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isSaving={isSaving}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isSaving={isSaving}
          />
          <DeleteCardPopup
            card={isDeleteCardPopupOpen.card}
            isOpen={isDeleteCardPopupOpen.isOpen}
            onClose={closeAllPopups}
            deleteCard={handleCardDelete}
            isSaving={isSaving}
          />
          <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups} 
          />
          <InfoPopup
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            isRegistration={isRegistration}/>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
