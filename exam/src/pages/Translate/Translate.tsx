import { SelectedLanguage } from "./components/SelectLanguage/SelectedLanguage";
import styles from "./Translate.module.scss";
import { HistoryRounded, TranslateRounded } from "@mui/icons-material";
import { useState } from "react";
import { translate } from "../../utils/translate";
import { useDispatch } from "react-redux";
import { addHistory, AppDispatch } from "../../app/store/store";
import { useNavigate } from "react-router-dom";
import { Language } from "../../consts/types";
import { defaultFrom, defaultLanguages, defaultTo } from "../../consts/consts";

export const Translate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [fromText, setFromText] = useState<string>("");
  const [toText, setToText] = useState<string>("");
  const [selectedFrom, setSelectedFrom] = useState<Language>(defaultLanguages[defaultFrom]);
  const [selectedTo, setSelectedTo] = useState<Language>(defaultLanguages[defaultTo]);

  const handleAddHistory = (fromText: string, toText: string, selectedFrom: string, selectedTo: string) => {
    dispatch(
      addHistory({
        fromText: fromText,
        toText: toText,
        selectedFrom: selectedFrom,
        selectedTo: selectedTo,
      })
    );
  };

  const handleTranslate = () => {
    translate(fromText, selectedFrom, selectedTo).then((result) => {
      if (!(result instanceof Error)) {
        const translated = result.responseData.translatedText
        setToText(translated);
        handleAddHistory(fromText, translated, selectedFrom, selectedTo);
      }
    });
  }

  return (
    <div className={styles.translate}>
      <div className={styles.translate__buttonsWrapper}>
        <button className={styles.translate__button} onClick={handleTranslate}>
          <TranslateRounded />
          Translate
        </button>
        <button className={styles.translate__historyButton} onClick={() => navigate('/history')}>
          <HistoryRounded />
        </button>
      </div>
      <header className={styles.translate__header}>
        <SelectedLanguage onChange={(value) => setSelectedFrom(value)} defaultIndex={defaultFrom} />
        <SelectedLanguage onChange={(value) => setSelectedTo(value)} defaultIndex={defaultTo} />
      </header>
      <main className={styles.translate__main}>
        <textarea value={fromText} onChange={(e) => setFromText(e.target.value)} />
        <textarea value={toText} onChange={(e) => setToText(e.target.value)} disabled/>
      </main>
    </div>
  );
}