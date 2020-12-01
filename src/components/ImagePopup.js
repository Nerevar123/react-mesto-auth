import React from "react";
import cn from "classnames";

function ImagePopup({ card, onClose }) {
  return (
    <section className={cn("modal", "modal_type_lightbox")}>
      <div className="modal__lightbox">
        <figure className="modal__figure">
          <img src={card.link} alt={card.link} className="modal__image" />
          <figcaption className="modal__caption">{card.name}</figcaption>
        </figure>
        <button
          className="modal__close-btn button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
