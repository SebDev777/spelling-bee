import { createContext, useState, useContext } from "react";

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [WordHistoryEnabled, setWordHistoryEnabled] = useState(true);
  const [SpellingViewEnabled, setSpellingViewEnabled] = useState(true);
  const [CurrentWord, setCurrentWord] = useState("Welcome.");
  const [WordHistory, setWordHistory] = useState([]);
  const [WordHistoryLength, setWordHistoryLength] = useState(4);
  const [WordList, setWordList] = useState([
    "Apple",
    "Working",
    "Extracurricular",
    "Phyllophyllin",
    "HyperTextTrackProtocol",
    "E-commerce",
    "Cold",
  ]);
  const [WordListBackUp, setWordListBackUp] = useState([]);
  const [SpecialWordSpelling, setSpecialWordSpelling] = useState(true)
  const [CountDownSelectedTime, setCountDownSelectedTime] = useState(30)
  const [CountDown, setCountDown] = useState(CountDownSelectedTime)
  const [WordDeletingSectionActive, setWordDeletingSectionActive] = useState(false)

  return (
    <MainContext.Provider
      value={{
        WordHistoryEnabled, setWordHistoryEnabled,
        SpellingViewEnabled, setSpellingViewEnabled,
        CurrentWord, setCurrentWord,
        WordHistory, setWordHistory,
        WordHistoryLength, setWordHistoryLength,
        WordList, setWordList,
        WordListBackUp, setWordListBackUp,
        SpecialWordSpelling, setSpecialWordSpelling,
        CountDown, setCountDown,
        CountDownSelectedTime, setCountDownSelectedTime,
        WordDeletingSectionActive, setWordDeletingSectionActive
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default function UseMainContext() {
  return useContext(MainContext);
}
