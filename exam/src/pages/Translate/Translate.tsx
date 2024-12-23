import { SelectedLanguage } from "./components/SelectLanguage/SelectedLanguage";
import styles from "./Translate.module.scss";
import { TranslateRounded } from "@mui/icons-material";
import { useState } from "react";
import { translate } from "../../utils/translate";
import { useDispatch } from "react-redux";
import { addHistory, AppDispatch } from "../../app/store/store";

export const Translate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [fromText, setFromText] = useState<string>("");
  const [toText, setToText] = useState<string>("");
  const [selectedFrom, setSelectedFrom] = useState<string>("Autodetect");
  const [selectedTo, setSelectedTo] = useState<string>("Autodetect");

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
      <button className={styles.translate__button} onClick={handleTranslate}>
        <TranslateRounded />
        Translate
      </button>
      <header className={styles.translate__header}>
        <SelectedLanguage onChange={(value) => setSelectedFrom(value)} defaultIndex={2} />
        <SelectedLanguage onChange={(value) => setSelectedTo(value)} defaultIndex={0} />
      </header>
      <main className={styles.translate__main}>
        <textarea value={fromText} onChange={(e) => setFromText(e.target.value)} />
        <textarea value={toText} onChange={(e) => setToText(e.target.value)} disabled/>
      </main>
    </div>
  );
}