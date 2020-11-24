import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../hooks/useFormWithValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSaving }) {
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name || '',
      link: values.link || '',
    });
  };

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
      children={(
        <fieldset className="modal__fields">
          <label className="modal__field">
            <input type="text" className={`modal__input ${errors.name && "modal__input_type_error"}`}
                   name="name" id="place-input" required minLength="2" maxLength="30"
                   value={values.name || ''} onChange={handleChange} />
            <span className={`modal__placeholder ${values.name && "modal__placeholder_is-fixed"}`} id="place-input-placeholder">Название</span>
            <span id="name-input-error" className={`modal__input-error ${errors.name && "modal__input-error_active"}`}>{errors.name || ''}</span>
          </label>
          <label className="modal__field">
            <input type="url" className={`modal__input ${errors.link && "modal__input_type_error"}`}
                  name="link" id="link-input" required value={values.link || ''} onChange={handleChange}/>
            <span className={`modal__placeholder ${values.link && "modal__placeholder_is-fixed"}`} id="link-input-placeholder">Ссылка на картинку</span>
            <span id="link-input-error" className={`modal__input-error ${errors.link && "modal__input-error_active"}`}>{errors.link || ''}</span>
          </label>
        </fieldset>
      )}
    />
  );
}

export default AddPlacePopup;
