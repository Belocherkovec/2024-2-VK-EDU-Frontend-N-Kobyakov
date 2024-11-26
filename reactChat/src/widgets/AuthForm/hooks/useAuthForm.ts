import { AppDispatch } from '@/app';
import { setUserAuthorized, setUserInfo } from '@/entities/User';
import { getCurrentUser, loginRequest, TEXTS } from '@/shared';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useAuthForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useState({
    login: TEXTS.empty,
    password: TEXTS.empty
  });
  const [isFormValid, setIsFormValid] = useState({
    login: true,
    password: true
  });

  const [isLoginError, setIsLoginError] = useState<boolean>(false);

  useEffect(() => {
    if (isLoginError) {
      setIsLoginError(false);
    }
  }, [formValues]);

  const handleFormChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      setFormValues((prev) => ({
        ...prev,
        [name]: value
      }));
    },
    []
  );

  const handleFormValidChange = useCallback((name: string, value: boolean) => {
    setIsFormValid((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginRequest(formValues.login, formValues.password, handleLoginResponse);
    resetForm();
  };

  const handleLoginResponse = (isAuth: boolean) => {
    if (isAuth) {
      dispatch(setUserAuthorized());
      getCurrentUser().then(({ data }) => dispatch(setUserInfo(data)));
    } else {
      setIsLoginError(true);
    }
  };

  const resetForm = () => {
    setFormValues({ login: TEXTS.empty, password: TEXTS.empty });
    setIsFormValid({ login: true, password: true });
  };

  const isDisabled = () =>
    !(
      Object.values(isFormValid).every((field) => field) &&
      Object.values(formValues).every((field) => field)
    );

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
