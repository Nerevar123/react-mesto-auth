import React from "react";
import PopupWithForm from "./PopupWithForm";
import Label from "./Label";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isSaving,
  validation,
}) {
  const { values, handleChange, errors, isValid, resetForm } = validation;

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar || "",
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Обновить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      isDisabled={!isValid}
      children={
        <Label
          values={values}
          onChange={handleChange}
          errors={errors}
          name="avatar"
          placeholder="Ссылка на аватар"
          type="url"
          required
        />
      }
    />
  );
}

export default EditAvatarPopup;
