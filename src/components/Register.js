import React from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import Label from "./Label";

function Register({ validation, isSaving }) {
  const { values, errors, handleChange, isValid, resetForm } = validation;

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
    resetForm();
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <Form
        name="nickname"
        onSubmit={handleSubmit}
        isDisabled={!isValid}
        isSaving={isSaving}
        isWhite={true}
        buttonText="Зарегистрироваться"
        children={
          <fieldset className="login__fields">
            <Label
              values={values}
              onChange={handleChange}
              errors={errors}
              name="email"
              placeholder="Email"
              isBlack
              type="email"
              required
            />
            <Label
              values={values}
              onChange={handleChange}
              errors={errors}
              name="password"
              placeholder="Пароль"
              isBlack
              type="password"
              required
              minLength="4"
              maxLength="16"
            />
          </fieldset>
        }
      ></Form>
      <p className="login__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
