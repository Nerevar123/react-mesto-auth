import React from 'react';

function ImagePopup(props) {
  return (
    <section className={`modal modal_type_lightbox ${props.card.link ? 'modal_opened' : ''}`}>
      <div className="modal__lightbox">
        <figure className="modal__figure">
          <img src={props.card.link} alt={props.card.link} className="modal__image" />
          <figcaption className="modal__caption">{props.card.name}</figcaption>
        </figure>
        <button className="modal__close-btn button" type="button" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;
