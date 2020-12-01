import React from "react";
import cn from "classnames";
import success from "../images/login-success.png";
import fail from "../images/login-fail.png";

function InfoTooltip({ isOpen, onClose, isSuccess, successText }) {
  return (
    <section
      className={cn("modal", "modal_type_info", { modal_opened: isOpen })}
    >
      <div className="modal__container">
        {isSuccess ? (
          <>
            <img className="modal__icon" src={success} alt="result" />
            <h3 className="modal__title">{successText}</h3>
          </>
        ) : (
          <>
            <img className="modal__icon" src={fail} alt="result" />
            <h3 className="modal__title">
              Что-то пошло не так! Попробуйте ещё раз.
            </h3>
          </>
        )}

        <button
          className="modal__close-btn button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
