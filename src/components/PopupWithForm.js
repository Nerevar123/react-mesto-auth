import React from 'react';

function PopupWithForm({
  title,
  name,
  buttonText = 'Сохранить',
  isOpen,
  onClose,
  onSubmit,
  isSaving,
  children,
  isDisabled = false,
}) {
  return (
    <section className={`modal modal_type_${name} ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" name={name} method="GET" action="#" noValidate onSubmit={onSubmit}>
          {children}
          <button className={`modal__save-btn button ${isDisabled && "modal__save-btn_disabled"}`} type="submit" disabled={isDisabled}>{isSaving ? 'Загрузка...' : buttonText}</button>
        </form>
        <button className="modal__close-btn button" type="button" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
