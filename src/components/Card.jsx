import { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

function Card({ card, handleCardClick, onCardLike, onCardDelete }) {
  
  const user = useContext(CurrentUserContext)
  const isOwn = card.owner._id === user._id;
  const cardDeleteButtonClassName = (`element__button-delete ${isOwn ? '' : 'element__button-delete_hidden'}`);
  const isLiked = card.likes.some(i => i._id === user._id);
  const cardLikeButtonClassName = (`element__svg-heart element__svg-heart_hover ${isLiked ? 'element__svg-heart_active' : ''}`);

  const handleClick = () => {
    handleCardClick({ link: card.link, name: card.name });
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  return (
    <li className='element'>
      <article className='element__card'>
        <button
          className={cardDeleteButtonClassName}
          type='button'
          onClick={handleDeleteClick}
        ></button>
        <img
          className='element__img'
          onClick={handleClick}
          src={card.link}
          alt={card.name}
        />
        <div className='element__description'>
          <h2 className='element__figcaption'>{card.name}</h2>
          <div className='element__like'>
            <button
              className={cardLikeButtonClassName}
              type='button'
              onClick={handleLikeClick}
            ></button>
            <div className='element__count'>{card.likes.length}</div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
