import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName  = (
    `place__like-btn button ${isLiked ? 'place__like-btn_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  };

  function handleLikeClick() {
    props.onCardLike(props.card);
  };

  function handleDeleteClick() {
    props.onDeleteClick(props.card);
  };

  return (
    <li className="place">
      <div className="place__img-wrapper" onClick={handleClick}>
        <img src={props.card.link} alt={props.card.name} className="place__image" />
      </div>
      <div className="place__header">
        <h3 className="place__title">{props.card.name}</h3>
        <div className="place__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="place__like-count">{props.card.likes.length}</span>
        </div>
      </div>
      <button className="place__delete-btn button" type="button" style={isOwn ? {} : {display: 'none'}} onClick={handleDeleteClick}></button>
    </li>
  );
}

export default Card;
