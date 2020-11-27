import React from "react";
import PopupWithForm from "./PopupWithForm";
import Label from "./Label";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSaving, validation }) {
  const { values, handleChange, errors, isValid, resetForm } = validation;

  React.useEffect(() => {
    resetForm();
    return () => {
      resetForm();
    };
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name || "",
      link: values.link || "",
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      isDisabled={!isValid}
      children={
        <fieldset className="form__fields">
          <Label
            values={values}
            onChange={handleChange}
            errors={errors}
            name="name"
            placeholder="Название"
            type="text"
            required
            minLength="2"
            maxLength="30"
          />
          <Label
            values={values}
            onChange={handleChange}
            errors={errors}
            name="link"
            placeholder="Ссылка на картинку"
            type="url"
            required
          />
        </fieldset>
      }
    />
  );
}

export default AddPlacePopup;
