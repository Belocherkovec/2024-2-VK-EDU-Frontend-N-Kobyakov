export const TEXTS = {
  actions: {
    createNewUser: 'Введите имя пользователя для нового диалога'
  },
  buttons: {
    clearStorage: 'Обновить локальное хранилище',
    toMain: 'Вернуться на главную'
  },
  empty: '',
  online: 'Онлайн',
  errors: {
    invalidNewUser: 'Не задано имя для нового пользователя',
    invalidImageFormat:
      'Неподдерживаемый формат. Пожалуйста, загрузите изображение!',
    loginError:
      'При авторизации произошла ошибка! Проверьте правильность ввода логина\n' +
      '          и пароля.'
  },
  headings: {
    EditProfile: 'Редактирование профиля'
  },
  images: {
    avatar: 'Аватар (изображение) пользователя'
  },
  lastActivity: { recently: 'был недавно' },
  noFile: 'Файл не выбран',
  pages: {
    auth: {
      action: 'Войти',
      login: 'Логин',
      noAccount: 'Нет аккаунта?',
      password: 'Пароль',
      title: 'Авторизация в Simple Messenger',
      toRegistration: 'Зарегистрироваться'
    },
    createChat: {
      title: 'Новое сообщение'
    },
    errorPage: {
      callToAction:
        'Чтобы ошибка исчезла, попробуйте нажать на кнопку "Обновить локальное хранилище"',
      title:
        'Извините, действие неудалось выполнить из-за непредвиденной ошибки!'
    },
    notFound: {
      subtitle:
        'Вы видите эту ошибку, потому что страница, которую вы запросили - не найдена!',
      title: 'Ошибка 404'
    },
    registration: {
      CommonPasswordError: 'Пароль слишком простой.',
      NonUniqueError: 'Ошибка, данный пользователь уже зарегистрирован.',
      OnlyNumberPasswordError: 'Пароль не должен состоять только из цифр.',
      UnknownError: 'Произошла неизвестная ошибка, попробуйте еще раз.',
      UsernameMismatchError:
        'Логин не соответствуют формату. Разрешенные символы: буквы, цифры и подчёркивание, ".", "@", "+", "-".',
      PasswordMismatchError:
        'Пароль не должен состоять только из цифр и не должен быть слишком простым.',
      action: 'Зарегистрироваться',
      avatar: 'Аватар пользователя',
      bio: 'Описание профиля',
      firstName: 'Имя пользователя',
      hasAccount: 'Уже зарегистированы?',
      lastName: 'Фамилия пользователя',
      login: 'Логин',
      password: 'Пароль',
      passwordNoEqual: 'Пароли должны совпадать!',
      repeatPassword: 'Повторите пароль',
      title: 'Регистрация в Simple Messenger',
      toAuth: 'Войти',
      preview: 'Предпросмотр пользователя'
    }
  },
  placeholders: {
    message: 'Сообщение...',
    search: 'Поиск...'
  },
  userForm: {
    bio: 'Описание профиля',
    fullName: 'Полное Имя',
    userName: 'Ник'
  }
};
