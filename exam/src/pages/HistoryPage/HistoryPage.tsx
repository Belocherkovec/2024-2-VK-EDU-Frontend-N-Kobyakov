import { useSelector, useDispatch } from 'react-redux';
import { selectHistory } from "../../app/store/store";
import { clearHistory } from '../../app/store/store';
import styles from './HistoryPage.module.scss';
import { ArrowBackRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import languages from '../../consts/languages.json';
import { Language } from "../../consts/types";

export const HistoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = useSelector(selectHistory);


  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  return (
    <div className={styles.history}>
      <header className={styles.history__header}>
        <button onClick={() => navigate('/')} className={styles.history__back}>
          <ArrowBackRounded/>
        </button>
        <h1 className={styles.history__title}>История</h1>
      </header>
      <div className={styles.history__historyWrapper}>
        <button className={styles.history__button} onClick={handleClearHistory}>
          Очистить историю
        </button>
      </div>

      {history.length > 0 ? (
        <div className={styles.history__list}>
          {history.map((entry, idx) => (
            <div key={idx} className={styles.history__item}>
              <div className={styles.history__fromToLang}>
                <span className={styles.historyItemFrom}>{languages[entry.selectedFrom as Language]}</span>
                <span>&rarr;</span>
                <span className={styles.historyItemTo}>{languages[entry.selectedTo as Language]}</span>
              </div>
              <div className={styles.history__fromToText}>
                <p>{entry.fromText}</p>
                <p className={styles.history__toText}>{entry.toText}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.history__emptyData}>История переводов отсутствует</p>
      )}
    </div>
  );
};
