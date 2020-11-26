import React from "react";
import Form from "./Form";
import Label from "./Label";

function Login({ validation, isSaving }) {
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
      <h2 className="login__title">Вход</h2>
      <Form
        name="nickname"
        onSubmit={handleSubmit}
        isDisabled={!isValid}
        isSaving={isSaving}
        isBlack={true}
        buttonText="Войти"
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
            />
          </fieldset>
        }
      ></Form>
    </section>
  );
}

export default Login;
