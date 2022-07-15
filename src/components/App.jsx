import { useEffect, useState, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ImagePopup from './ImagePopup';
import InfoPopup from './InfoPopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from  './DeleteCardPopup';
import BurgerMenu from  './BurgerMenu';
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
  const [userEmail, setIsUserEmail] = useState('');
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([user, items]) => {
        setUser(user);
        setCards(items);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickEditAvatar = () => {
    setIsAvatarPopup(true);
  }

  const handleClickEditProfile = () => {
    setIsProfilePopup(true);
  }

  const handleClickAddPlace = () => {
    setIsPlacePopup(true);
  }

  const handleClickDeleteCard = (card) => {
    deleteIsCardPopup({isOpen: true, card: card});  
  }

  const handleCardClick = (card) => {
    setIsSelectedCard(card);
  }

  const handleClickBurgerMenu = () => {
    setIsOpenBurgerMenu(!isOpenBurgerMenu)
  }

  const closeAllPopups = () => {
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

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || isInfoPopupOpen

  useEffect(() => {
    function closeByEscape(e) {
      if(e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateAvatar = (picture) => {
    setIsSaving(true);
    api
      .setAvatar(picture)
      .then((user) => {
        setUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateUser = (user) => {
    setIsSaving(true);
    api
      .setUser(user)
      .then((user) => {
        setUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  const handleAddPlaceSubmit = (card) => {
    setIsSaving(true);
    api
      .setCard(card)
      .then((newCard) => {
        setCards([newCard, ...currentCards]);
        closeAllPopups(); 
      })
      .catch((err) => console.log(err))
  }

  const handleCardDelete = (card) => {
    setIsSaving(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  const handleRegistration = (data) => {
    auth
      .registration(data)
      .then((res) => {
        if (res){
          history.push('/sign-in');
          setIsRegistration(true);
        } else {
          setIsRegistration(false);
        }
      })
      .finally(() => setIsInfoPopup(true))
      .catch((err) => {
        console.log(err);
        setIsRegistration(false);
      })
  }
  
  const handleAuthorization = (data) => {
    auth
      .authorization(data)
      .then((res) => {
        if (res){
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => console.log(err))
  }

  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      auth
        .checkToken(jwt).then((res) => {
          if (res){
            setIsLoggedIn(true);
            history.push('/');
            setIsUserEmail(res.data.email)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [history])

  useEffect(() => {
    checkToken();
  }, [checkToken])


  const handleSignOut = () => {
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className='content'>

          <BurgerMenu
            userEmail={userEmail}
            handleSignOut={handleSignOut}
            handleClickBurgerMenu={handleClickBurgerMenu}
            isOpenBurgerMenu={isOpenBurgerMenu}
          />

          <Header
            userEmail={userEmail}
            handleSignOut={handleSignOut}
            handleClickBurgerMenu={handleClickBurgerMenu}
            isOpenBurgerMenu={isOpenBurgerMenu}
          />

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
            <Route exact path='/sign-in'>
              <Login 
                handleAuthorization={handleAuthorization}
                setIsUserEmail={setIsUserEmail}
              />
            </Route>
            <Route exact path='/sign-up'>
              <Register handleRegistration={handleRegistration}/>
            </Route>
            <Route>
              {loggedIn ? <Redirect to='/'/> : <Redirect to='/sign-in'/>}
            </Route>
          </Switch>

          <Footer/>

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
            isRegistration={isRegistration}
          />

        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
