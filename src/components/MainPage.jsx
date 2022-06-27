import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function MainPage({ cards, onEditAvatar, onEditProfile, onCardLike, onCardDelete, onAddPlace, handleCardClick, setCards }) {
  return (
    <>
      <Header />
      <Main
        cards={cards}
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        onAddPlace={onAddPlace}
        handleCardClick={handleCardClick}
        setCards={setCards}
      />
      <Footer />
    </>
  )
};

export default MainPage;