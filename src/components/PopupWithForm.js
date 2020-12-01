import React from "react";
import Form from "./Form";
import cn from "classnames";

function PopupWithForm({
  title,
  name,
  buttonText = "Сохранить",
  isOpen,
  onClose,
  onSubmit,
  isSaving,
  children,
  isDisabled,
}) {
  return (
    <section className={cn("modal", `modal_type_${name}`)}>
      <div className="modal__container">
        <h3 className="modal__title">{title}</h3>
        <Form
          name={name}
          onSubmit={onSubmit}
          isDisabled={isDisabled}
          isSaving={isSaving}
          buttonText={buttonText}
          children={children}
        ></Form>
        <button
          className="modal__close-btn button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
