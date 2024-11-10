import { AppDispatch } from '@/app/store';
import { setUserAuthorized } from '@/entities/User';
import { login as loginRequest } from '@/shared/api/auth';
import { TEXTS } from '@/shared/consts';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useAuthForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useState({
    login: TEXTS.empty,
    password: TEXTS.empty
  });
  const [isFormValid, setIsFormValid] = useState({
    login: false,
    password: false
  });

  const [isLoginError, setIsLoginError] = useState<boolean>(false);

  useEffect(() => {
    if (isLoginError) {
      setIsLoginError(false);
    }
  }, [formValues]);

  const handleFormChange = (field: 'login' | 'password', value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleFormValidChange = (
    field: 'login' | 'password',
    value: boolean
  ) => {
    setIsFormValid({ ...isFormValid, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginRequest(formValues.login, formValues.password, handleLoginRequest);
    resetForm();
    resetIsValidForm();
  };

  const handleLoginRequest = (isAuth: boolean) => {
    if (isAuth) {
      dispatch(setUserAuthorized());
    } else {
      setIsLoginError(true);
    }
  };

  const resetForm = () =>
    setFormValues({ login: TEXTS.empty, password: TEXTS.empty });
  const resetIsValidForm = () =>
    setIsFormValid({ login: false, password: false });

  const isDisabled = () => !(isFormValid.login && isFormValid.password);

  return {
    formValues,
    handleFormChange,
    handleFormValidChange,
    handleSubmit,
    isDisabled,
    isFormValid,
    isLoginError
  };
};
