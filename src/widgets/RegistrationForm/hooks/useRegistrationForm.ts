import { AxiosError, AxiosResponse } from 'axios';
import { registrationRequest, RoutePaths, TEXTS } from '@/shared';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IErrorResponse {
  username?: string[];
  password?: string[];
}

const getRegistrationErrors = (responseData: IErrorResponse): string[] => {
  const { username, password } = responseData;
  const result = [];

  if (
    username &&
    username.includes('A user with that username already exists.')
  ) {
    result.push(TEXTS.pages.registration.NonUniqueError);
  }

  if (password && password.includes('This password is too common.')) {
    result.push(TEXTS.pages.registration.CommonPasswordError);
  }
  if (password && password.includes('This password is entirely numeric.')) {
    result.push(TEXTS.pages.registration.OnlyNumberPasswordError);
  }
  if (password && !result.length) {
    result.push(TEXTS.pages.registration.UnknownError);
  }

  return result.sort((a, b) => a.length - b.length);
};

export const useRegistrationForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    bio: TEXTS.empty,
    firstName: TEXTS.empty,
    lastName: TEXTS.empty,
    password: TEXTS.empty,
    username: TEXTS.empty
  });
  const [isFormValid, setIsFormValid] = useState({
    bio: true,
    firstName: true,
    lastName: true,
    password: true,
    username: true,
    avatar: true
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [registrationErrors, setRegistrationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (registrationErrors.length) {
      setRegistrationErrors([]);
    }
  }, [formValues]);

  const handleFormValidChange = useCallback((name: string, value: boolean) => {
    setIsFormValid((prev) => ({ ...prev, [name]: value }));
  }, []);

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

  const handleAvatarChange = (file: File | null) => {
    setAvatar(file);
  };
  const handleAvatarErrorChange = (state: boolean) => {
    setIsFormValid({ ...isFormValid, avatar: state });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registrationRequest(
      {
        ...formValues,
        first_name: formValues.firstName,
        last_name: formValues.lastName
      },
      handleRegistrationResponse
    );
    resetForm();
  };

  const handleRegistrationResponse = (response: AxiosResponse | AxiosError) => {
    const handleErrorRegistrationResponse = (error: AxiosError) => {
      if (error.response) {
        setRegistrationErrors(
          getRegistrationErrors(error.response.data as IErrorResponse)
        );
      }
    };

    if (response.status && response.status >= 400) {
      handleErrorRegistrationResponse(response as AxiosError);
    } else {
      navigate(RoutePaths.authPage);
    }
  };

  const resetForm = () => {
    setFormValues({
      bio: TEXTS.empty,
      firstName: TEXTS.empty,
      lastName: TEXTS.empty,
      password: TEXTS.empty,
      username: TEXTS.empty
    });
    setIsFormValid({
      bio: true,
      firstName: true,
      lastName: true,
      password: true,
      username: true,
      avatar: true
    });
    setAvatar(null);
  };

  const isDisabled = () =>
    !(
      Object.values(isFormValid).every((field) => field) &&
      formValues.username &&
      formValues.firstName &&
      formValues.lastName &&
      formValues.password
    );

  return {
    avatar,
    formValues,
    handleAvatarChange,
    handleFormChange,
    handleFormValidChange,
    handleSubmit,
    isDisabled,
    isFormValid,
    registrationErrors,
    handleAvatarErrorChange
  };
};
