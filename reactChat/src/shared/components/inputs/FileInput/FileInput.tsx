import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import cn from 'classnames';

import styles from './fileInput.module.scss';
import { useFileInput } from './hooks';
import { TEXTS } from '@/shared';

export interface IFileInputProps {
  accept?: string[];
  file: File | null;
  label?: string;
  onChange: (file: File | null) => void;
  isValid?: (state: boolean) => void;
}

export const FileInput: React.FC<IFileInputProps> = (props) => {
  const { accept, file, label } = props;

  const {
    fileName,
    fileSize,
    handleChooseFile,
    handleFileChange,
    handleResetFile,
    inputRef,
    isError
  } = useFileInput(props);

  return (
    <div className={styles.fileInput}>
      <p className={styles.fileInput__label}>{label}</p>
      <input
        accept={accept?.join(',')}
        className={styles.fileInput__input}
        onChange={handleFileChange}
        ref={inputRef}
        type="file"
      />
      <div className={styles.fileInput__wrapper}>
        <button
          className={styles.fileInput__fileButton}
          onClick={handleChooseFile}
          type="button"
        >
          <InsertDriveFileRoundedIcon
            className={cn(
              styles.fileInput__icon,
              file && styles._withFile,
              isError && styles._withError
            )}
          />
          <p className={styles.fileInput__info}>
            <span className={cn(isError && styles._withError)}>
              {(isError && TEXTS.errors.invalidImageFormat) || fileName}
            </span>
            <span className={styles.fileInput__fileSize}>
              {(isError && fileName) || fileSize}
            </span>
          </p>
        </button>
        <button
          className={styles.fileInput__trash}
          disabled={!file}
          onClick={handleResetFile}
          type="button"
        >
          <DeleteRoundedIcon
            className={cn(
              styles.fileInput__icon,
              styles.fileInput__iconTrash,
              file && styles._withHover
            )}
          />
        </button>
      </div>
    </div>
  );
};
