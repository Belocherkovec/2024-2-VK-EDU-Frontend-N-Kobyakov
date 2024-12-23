import languages from '../../../../consts/languages.json';
import { Language } from "../../../../consts/types";
import { defaultLanguages } from "../../../../consts/consts";
import cn from 'classnames';
import { useState } from "react";

import styles from './SelectedLanguage.module.scss';

interface Props {
  onChange: (lang: Language) => void;
  defaultIndex?: number;
}

export const SelectedLanguage: React.FC<Props> = ({
  onChange,
  defaultIndex = 0,
}) => {
  const selectedLanguage = "default";
  const [lastUsedLanguages, setLastUsedLanguages] = useState<Language[]>([...defaultLanguages]);
  const [activeLanguage, setActiveLanguage] = useState<number>(defaultIndex);

  const handleOptionClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const languageKey = event.target.value as Language;
    setActiveLanguage(0);
    setLastUsedLanguages([languageKey, ...lastUsedLanguages.slice(1)]);
    onChange(languageKey);
  }

  const handleLanguageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clickIdx = (event.target as HTMLButtonElement).getAttribute("data-index");
    if (clickIdx) {
      setActiveLanguage(+clickIdx);
      onChange(lastUsedLanguages[+clickIdx]);
    }
  }

  return (
    <div className={styles.translate}>
      <div>
        <div>
          {lastUsedLanguages.map((lang, idx) =>
            <button
              className={cn(styles.translate__languageButton, (idx === activeLanguage) && styles._active)}
              key={idx}
              data-index={idx}
              onClick={handleLanguageChange}
            >
              {languages[lang]}
            </button>
          )}
          <select className={styles.translate__select} value={selectedLanguage} onChange={handleOptionClick}>
            <option value={selectedLanguage} disabled></option>
            {Object.keys(languages).map((language, idx) => (
              <option key={idx} value={language}>
                {languages[language as Language]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}