import React from "react";
import { Link } from "react-router-dom";
import Label from "./Label";
import SaveButton from "./SaveButton";
import cn from "classnames";
import useFormWithValidation from "../hooks/useFormWithValidation";

function Login({values}) {
  const {
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  } = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form
        className="modal__form"
        name="nickname"
        method="GET"
        action="#"
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset className="login__fields">
          <Label
            name="nickname"
            placeholder="Email"
            isBlack
            type="text"
            required
            minLength="2"
            maxLength="40"
            pattern="[a-zA-Zа-яА-Я -]{1,}"
            values={values}
          />
          <Label name="avatar" placeholder="Пароль" values={values} isBlack type="url" required />
        </fieldset>
        <SaveButton
          buttonText="Зарегистрироваться"
          isDisabled={false}
          isSaving={false}
          isWhite
        />
        <p className="login__text">
          Уже зарегистрированы?{" "}
          <Link to="/sign-up" className="login__link">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
