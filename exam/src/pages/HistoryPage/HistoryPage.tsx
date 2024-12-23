import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHistory } from '../../app/store/store';
import { clearHistory } from '../../app/store/store';
import styles from './HistoryPage.module.scss';

export const HistoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  return (
    <div className={styles.historyPage}>
      <h1 className={styles.title}>Translation History</h1>

      {history.length > 0 ? (
        <div className={styles.historyList}>
          {history.map((entry, idx) => (
            <div key={idx} className={styles.historyItem}>
              <div className={styles.historyItemHeader}>
                <span className={styles.historyItemFrom}>{entry.selectedFrom}</span>
                <span className={styles.historyItemTo}>{entry.selectedTo}</span>
              </div>
              <div className={styles.historyItemText}>
                <p className={styles.historyItemFromText}>{entry.fromText}</p>
                <p className={styles.historyItemToText}>{entry.toText}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noHistory}>No history available</p>
      )}

      <button className={styles.clearButton} onClick={handleClearHistory}>
        Clear History
      </button>
    </div>
  );
};
