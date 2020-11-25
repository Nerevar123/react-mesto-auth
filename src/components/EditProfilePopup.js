import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../hooks/useFormWithValidation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSaving }) {
  const {values, handleChange, errors, isValid, setIsValid, resetForm} = useFormWithValidation();

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      resetForm({
        nickname: currentUser.name,
        description: currentUser.about});
      setIsValid(true);
    }
  }, [currentUser, resetForm, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.nickname || '',
      about: values.description || '',
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="title"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      isDisabled={!isValid}
      children={(
        <fieldset className="modal__fields">
          <label className="modal__field">
            <input type="text" className={`modal__input ${errors.nickname && "modal__input_type_error"}`}
                   name="nickname" required minLength="2" maxLength="40"
                   pattern="[a-zA-Zа-яА-Я -]{1,}" value={values.nickname || ''} onChange={handleChange} />
            <span className={`modal__placeholder ${values.nickname && "modal__placeholder_is-fixed"}`}>Имя</span>
            <span className={`modal__input-error ${errors.nickname && "modal__input-error_active"}`}>{errors.nickname || ''}</span>
          </label>
          <label className="modal__field">
            <input type="text" className={`modal__input ${errors.description && "modal__input_type_error"}`}
                   name="description" required minLength="2" maxLength="200"
                   value={values.description || ''} onChange={handleChange} />
            <span className={`modal__placeholder ${values.description && "modal__placeholder_is-fixed"}`}>О себе</span>
            <span className={`modal__input-error ${errors.description && "modal__input-error_active"}`}>{errors.description || ''}</span>
          </label>
        </fieldset>
      )}
    />
  );
}

export default EditProfilePopup;
