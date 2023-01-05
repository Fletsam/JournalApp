import { useEffect, useMemo, useState } from "react";

export const useForm = (initalForm = {}, formValidations = {}) => {
  const [formstate, setFormstate] = useState(initalForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formstate]);

  useEffect(() => {
    setFormstate(initalForm);
  }, [initalForm]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormstate({
      ...formstate,
      [name]: value,
    });
  };
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onReset = () => {
    setFormstate(initalForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formstate[formField])
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };
  return {
    ...formstate,
    formstate,
    onInputChange,
    onReset,
    ...formValidation,
    isFormValid,
  };
};
