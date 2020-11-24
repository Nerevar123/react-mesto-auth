import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../hooks/useFormWithValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSaving }) {
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar || '',
    });
  };

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
    children={(
      <label className="modal__field">
        <input type="url" className={`modal__input ${errors.avatar && "modal__input_type_error"}`}
               name="avatar" id="avatar-input" required value={values.avatar || ''} onChange={handleChange} />
        <span className={`modal__placeholder ${values.avatar && "modal__placeholder_is-fixed"}`} id="avatar-input-placeholder">Ссылка на аватар</span>
        <span id="avatar-input-error" className={`modal__input-error ${errors.avatar && "modal__input-error_active"}`}>{errors.avatar || ''}</span>
      </label>
    )}
  />
  );
}

export default EditAvatarPopup;
