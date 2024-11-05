import { PopupWindow } from '@/features';

import styles from './showUpdates.module.scss';

export const ShowUpdates: React.FC<{
  isVisible: boolean;
  onVisibleChange: () => void;
}> = ({ isVisible, onVisibleChange }) => (
  <PopupWindow
    isVisible={isVisible}
    onClose={onVisibleChange}
    title={'Что нового?'}
  >
    <h4 className={styles.subtitle}>v0.2.0</h4>
    <ul className={styles.list}>
      <li>
        Реализована смена статуса у сообщений, когда сообщение появляется на
        экране
      </li>
      <li>Теперь у сообщений в диалоге отображается текущий статус</li>
      <li>При вводе сообщения, без отправки, оно сохраняется как черновик</li>
      <li>
        Черновики сообщений теперь отображаются в миниатюре диалогов, с пометкой
        "черновик"
      </li>
      <li>Исправлена возможность отправлять пустые сообщения в диалогах</li>
      <li>
        Теперь на время загрузки картинки пользователя отображается "лоадер"
      </li>
      <li>
        Добавлена страница, позволяющая создавать и редактировать пользователей
      </li>
      <li>Добавлена возможность редактировать созданных пользователей</li>
      <li>
        Добавлено всплывающее окно, информировающее о нововведениях
        (показывается только один раз, после обновления)
      </li>
    </ul>
  </PopupWindow>
);
