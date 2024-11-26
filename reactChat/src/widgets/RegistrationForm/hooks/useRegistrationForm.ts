import { registrationRequest } from '@/shared';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useRegistrationForm = () => {
  const [formValues, setFormValues] = useState({
    bio: '',
    firstName: '',
    lastName: '',
    password: '',
    username: ''
  });
  const [isFormValid, setIsFormValid] = useState({
    bio: true,
    firstName: true,
    lastName: true,
    password: true,
    username: true
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [isRegistrationError, setIsRegistrationError] = useState(false);

  useEffect(() => {
    if (isRegistrationError) {
      setIsRegistrationError(false);
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

  const handleRegistrationResponse = (response: AxiosResponse) => {
    if (response.status >= 400) {
      setIsRegistrationError(true);
    }
  };

  const resetForm = () => {
    setFormValues({
      bio: '',
      firstName: '',
      lastName: '',
      password: '',
      username: ''
    });
    setIsFormValid({
      bio: true,
      firstName: true,
      lastName: true,
      password: true,
      username: true
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
    isRegistrationError
  };
};
