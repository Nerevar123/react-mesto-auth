import React from 'react';

function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};
}

export default useForm;
