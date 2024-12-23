import { PopupWindow } from 'ReactChat/src/shared';

import styles from './showUpdates.module.scss';

export const ShowUpdates: React.FC<{
  isVisible: boolean;
  onVisibleChange: () => void;
}> = ({ isVisible, onVisibleChange }) => (
  <PopupWindow
    isVisible={isVisible}
    onClose={onVisibleChange}
    title={'Что нового?'}
    size="xl"
  >
    <details open className={styles.modal__detail}>
      <summary className={styles.modal__summary}>v1.3.0</summary>
      <ul className={styles.modal__list}>
        <li>
          Поле ввода, на котором сфокусирован пользователь больше не выдает
          ошибку, что поле не заполнено.
        </li>
        <li>
          После успешной регистрации пользователя перенаправляет на страницу
          авторизации.
        </li>
        <li>
          Оптимизирована отправка запросов на список пользователей и чатов.
          Теперь запрос происходит, только если данные отсутствуют
        </li>
        <li>
          Исправлены визуальные недочеты, которые возникали, если у пользователя
          очень длинные инициалы
        </li>
        <li>Добавлена возможность отправлять свою геопозицию</li>
        <li>
          Добавлена возможность прикреплять вложения: изображения и запись
          голосового сообщения. Максимальное количество изображений - 5.
          Голосовое сообщение максимум - 1.При отправке голосового сообщения
          нельзя отправить текст или изображения
        </li>
        <li>
          Добавлена возможность открыть изображения в модальном окне для более
          детального просмотра
        </li>
        <li>Добавлена возможность прослушивать голосовые сообщения</li>
        <li>Добавлены уведомления при получении нового сообщения</li>
        <li>
          Реализована плавная загрузка изображений, при появлении изображения на
          экране
        </li>
      </ul>
    </details>
    <details className={styles.modal__detail}>
      <summary className={styles.modal__summary}>v1.2.0</summary>
      <ul className={styles.modal__list}>
        <li>Обновлены требования к логину и паролю при регистрации</li>
        <li>
          Ошибка при регистрации теперь имеет более подробное описание: аккаунт
          уже существует, пароль не соответствует требованиям и т.п.
        </li>
        <li>
          Исправлено ошибочное поведение, при котором после перезагрузки
          страницы регистрации пользователя перенаправляло на страницу
          авторизации
        </li>
        <li>Добавлен предпросмотр пользователя при регистрации</li>
        <li>
          Теперь в диалоге, при отправке сообщения пользователя скроллит вниз
        </li>
        <li>
          Решена проблема: ранее, когда авторизованный пользователь вручную
          вводил url страницы авторизации или регистрации и пытался перейти на
          нее - его возвращало обратно, но после этого, при нажатии кнопки
          ‘назад’ в браузере, пользователь возвращался на ту же самую страничку,
          на которой он был. Теперь это работает корректно.
        </li>
        <li>Реализован поиск по чатам</li>
      </ul>
    </details>
    <details className={styles.modal__detail}>
      <summary className={styles.modal__summary}>v1.1.0</summary>
      <ul className={styles.modal__list}>
        <li>Реализована страница регистрации</li>
        <li>Теперь при создании диалога пользователь сразу переходит в него</li>
        <li>Добавлена возможность поиска пользователей</li>
        <li>У пользователя добавлен статус (онлайн, оффлайн)</li>
        <li>Статус пользователя отображается в диалогах и в аватаре</li>
        <li>
          Обновлено всплывающее окно, информирующее пользователя о изменениях
        </li>
      </ul>
    </details>
    <details className={styles.modal__detail}>
      <summary className={styles.modal__summary}>v1.0.0</summary>
      <p className={styles.modal__text}>
        <b>
          Добавлено взаимодействие с сервером. Теперь все диалоги и собеседники
          - реальные пользователи.
        </b>{' '}
        <br />В связи с этим был удален функционал «имитации собеседника» в
        диалогах, переписан весь функционал проекта с учетом взаимодействия с
        сервером.
      </p>
      <ul className={styles.modal__list}>
        <li>Добавлена страница авторизации</li>
        <li>
          Реализована авторизация и аутентификация пользователя (проверка что
          пользователь авторизован)
        </li>
        <li>Реализована валидация вводимых значений на странице авторизации</li>
        <li>
          В приложении реализована система переадресации. Если авторизованный
          пользователь попытается перейти на страницу авторизации, то его вернет
          обратно
        </li>
        <li>
          В поле ввода пароля реализована возможность переключить отображение
        </li>
      </ul>
    </details>
    <details className={styles.modal__detail}>
      <summary className={styles.modal__summary}>v0.2.0</summary>
      <ul className={styles.modal__list}>
        <li>
          Реализована смена статуса у сообщений, когда сообщение появляется на
          экране
        </li>
        <li>Теперь у сообщений в диалоге отображается текущий статус</li>
        <li>При вводе сообщения, без отправки, оно сохраняется как черновик</li>
        <li>
          Черновики сообщений теперь отображаются в миниатюре диалогов, с
          пометкой "черновик"
        </li>
        <li>Исправлена возможность отправлять пустые сообщения в диалогах</li>
        <li>
          Теперь на время загрузки картинки пользователя отображается "лоадер"
        </li>
        <li>
          Добавлена страница, позволяющая создавать и редактировать
          пользователей
        </li>
        <li>Добавлена возможность редактировать созданных пользователей</li>
        <li>
          Добавлено всплывающее окно, информировавшее о нововведениях
          (показывается только один раз, после обновления)
        </li>
      </ul>
    </details>
  </PopupWindow>
);