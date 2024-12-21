export const TEXTS = {
  ariaLabels: {
    showPassword: 'Показать пароль',
    chooseFile: 'Выбрать вложение',
    removeFile: 'Удалить вложение',
    clearStorage: 'Очистить localStorage',
    goBack: 'Вернуться назад',
    saveChanges: 'Сохранить изменения',
    openMenu: 'Открыть меню',
    createNewChat: 'Создать новый чат',
    search: 'Поиск',
    auth: 'Войти в мессенджер',
    registration: 'Зарегистрироваться',
    addImages: 'Прикрепить изображения',
    showActions: 'Отобразить контекстное меню',
    voiceMessageStart: 'Начать запись голосового сообщения',
    voiceMessageStop: 'Остановить запись голосового сообщения',
    sendGeo: 'Отправить свою геопозицию',
    sendMessage: 'Отправить сообщение',
    startVoice: 'Начать проигрывать голосовое сообщение',
    stopVoice: 'Остановить проигрывание голосового сообщения',
    cancel: 'Отменить действие',
    confirm: 'Подтвердить действие'
  },
  notification: {
    title: 'Новое сообщение',
    body: (initials: string) => `У вас одно новое сообщение от ${initials}!`
  },
  actions: {
    createNewUser: 'Введите имя пользователя для нового диалога'
  },
  buttons: {
    clearStorage: 'Обновить локальное хранилище',
    toMain: 'Вернуться на главную'
  },
  utils: {
    geo: {
      errorTitle: 'Ошибка при получении геопозиции.',
      PERMISSION_DENIED:
        'Не удалось получить информацию о геолокации, поскольку у страницы не было разрешения на это.',
      POSITION_UNAVAILABLE:
        'Не удалось получить геолокацию, поскольку по крайней мере один внутренний источник позиции вернул внутреннюю ошибку.',
      TIMEOUT: 'Время, разрешённое для получения геолокации, истекло.'
    }
  },
  empty: '',
  online: 'Онлайн',
  errors: {
    defaultErrorTitle: 'Ошибка',
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
    chatsPage: {
      settings: 'Настройки'
    },
    dialogPage: {
      sendGeo: 'Геопозиция',
      image: 'Изображение',
      confirm: 'Продолжить',
      cancel: 'Отмена',
      imageLimit: (limit: number) =>
        `Вы можете прикрепить к сообщению не более ${limit} изображений.`
    },
    auth: {
      action: 'Войти',
      login: 'Логин',
      noAccount: 'Нет аккаунта?',
      password: 'Пароль',
      title: 'Авторизация в Simple Messenger',
      toRegistration: 'Зарегистрироваться',
      loginPlaceholder: 'Введите ваш логин',
      passwordPlaceholder: 'Введите ваш пароль'
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
      preview: 'Предпросмотр пользователя',
      loginPlaceholder: 'Придумайте логин',
      passwordPlaceholder: 'Придумайте пароль',
      firstNamePlaceholder: 'Введите ваше имя',
      lastNamePlaceholder: 'Введите вашу Фамилию',
      bioPlaceholder: 'Заполните краткую информацию о себе'
    },
    profilePage: {
      title: (name: string) => `Просмотр профиля ${name}`
    },
    editProfilePage: {
      title: 'Настройки профиля',
      save: 'Сохранить',
      reset: 'Сбросить',
      remove: 'Удалить',
      deleteAccount: 'Удалить профиль',
      logout: 'Выйти из профиля',
      successTitle: 'Успех!',
      successMessage: 'Данные пользователя успешно обновлены!',
      errorTitle: 'Ошибка!',
      errorMessage: 'Не удалось обновить данные пользователя!',
      avatarUpdateErrorTitle: 'Ошибка при попытке загрузить изображение.',
      avatarUpdateErrorMessage: 'Пожалуйста загрузите корректное изображение!',
      confirmTitle: 'Удалить профиль',
      confirmMessage:
        'Вы уверены, что хотите удалить профиль? Действие необратимо!',
      errorRemoveAccount: 'Произошла ошибка при удалении аккаунта.'
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
  },
  audio: {
    name: 'Голосовое сообщение'
  }
};
