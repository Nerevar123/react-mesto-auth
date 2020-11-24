import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onConfirm();
  };

  return (
  <PopupWithForm
    title="Вы уверены?"
    name="confirm"
    buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isSaving={props.isSaving}
  />
  );
}

export default ConfirmPopup;
