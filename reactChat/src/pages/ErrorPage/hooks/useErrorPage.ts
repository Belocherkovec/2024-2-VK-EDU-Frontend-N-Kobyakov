import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError
} from 'react-router-dom';

export const useErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `Error ${error.status}: ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'Unknown error occurred';
  }

  const handleClearButtonClick = () => {
    localStorage.clear();
    navigate('/');
    location.reload();
  };

  return { errorMessage, handleClearButtonClick };
};
