import { Input } from '@/shared/components';
import { TEXTS } from '@/shared/consts/texts';
import { EditProfileHeader } from '@/widgets/EditProfileHeader';
import cn from 'classnames';

import styles from './editProfilePage.module.scss';
import { useEditProfilePage } from './hooks/useEditProfilePage';

export const EditProfilePage = () => {
  const {
    avatar,
    bio,
    fullName,
    handleClickAvatar,
    handleFormChange,
    handleSave,
    handleSubmit,
    userName
  } = useEditProfilePage();

  return (
    <section>
      <EditProfileHeader onSave={handleSave} />
      <button
        className={cn(styles.form__avatar, !avatar && styles._bg)}
        onClick={handleClickAvatar}
      >
        {/*{avatar && <Avatar alt={TEXTS.images.avatar} src={avatar} />}*/}
      </button>
      <form action="/" className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span className={styles.form__label}>{TEXTS.userForm.fullName}</span>
          <Input
            className={styles.form__input}
            onChange={(e) => handleFormChange('fullName', e.target.value)}
            value={fullName}
          />
        </label>
        <label>
          <span className={styles.form__label}>{TEXTS.userForm.userName}</span>
          <Input
            className={styles.form__input}
            onChange={(e) => handleFormChange('userName', e.target.value)}
            value={userName}
          />
        </label>
        <label>
          <span className={styles.form__label}>{TEXTS.userForm.bio}</span>
          <Input
            className={styles.form__input}
            onChange={(e) => handleFormChange('bio', e.target.value)}
            type="textarea"
            value={bio}
          />
        </label>
      </form>
    </section>
  );
};
