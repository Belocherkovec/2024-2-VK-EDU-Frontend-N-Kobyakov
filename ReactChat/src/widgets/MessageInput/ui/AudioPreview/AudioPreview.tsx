import {
  CloseRounded,
  PlayCircleRounded,
  StopCircleRounded
} from '@mui/icons-material';
import { TEXTS } from 'ReactChat/src/shared';

import { useAudioPreview } from './hooks';
import styles from './audioPreview.module.scss';

export interface IAudioPreview {
  voice: Blob;
  onRemove: () => void;
}

export const AudioPreview: React.FC<IAudioPreview> = (props) => {
  const { onRemove } = props;
  const { isPlaying, handlePlay, handlePause } = useAudioPreview(props);

  return (
    <div className={styles.audioPreview}>
      <p className={styles.audioPreview__text}>{TEXTS.audio.name}</p>
      <button
        onClick={isPlaying ? handlePause : handlePlay}
        className={styles.audioPreview__button}
        aria-label={
          isPlaying ? TEXTS.ariaLabels.stopVoice : TEXTS.ariaLabels.startVoice
        }
      >
        {isPlaying && (
          <StopCircleRounded className={styles.audioPreview__icon} />
        )}
        {!isPlaying && (
          <PlayCircleRounded className={styles.audioPreview__icon} />
        )}
      </button>
      <button onClick={onRemove} className={styles.audioPreview__button}>
        <CloseRounded className={styles.audioPreview__icon} />
      </button>
    </div>
  );
};
