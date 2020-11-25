import React from "react";

function Form(props) {
  return (
    <form
      className="modal__form"
      name={props.name}
      method="GET"
      noValidate
      onSubmit={props.onSubmit}
    >
      {props.children}
      <button
        className={`modal__save-btn button ${
          props.isDisabled && "modal__save-btn_disabled"
        }`}
        type="submit"
        disabled={props.isDisabled}
      >
        {props.isSaving ? "Загрузка..." : props.buttonText}
      </button>
    </form>
  );
}

export default Form;
