import { useState, useEffect } from "react";
import UseMainContext from "../../contexts/MainContext"

import {
  spelling as spells,
  special as Sspells,
} from "../../logic/WordSpelling";

function WordListHistory({ active, word }) {
  return <li class={"list-group-item" + active}>{word}</li>;
}

function GenerateSpellingText(spell, specialSpelling) {
  return spell.map((l, i) => {
    const spelling = spells[l.toLowerCase()];
    const continuation = i !== spell.length - 1 ? "-" : "";
    if (spelling) {
      return spelling + continuation;
    } else {
      const special_spelling = Sspells[l];
      if (!special_spelling) return "err";
      return specialSpelling && (
        <span style={{ color: "rgb(251, 189, 97)" }}>
          {special_spelling + continuation}
        </span>
      )
    }
  });
}

function GenerateWordHistoryDisplay(WordHistory) {
  return WordHistory.slice()
      .reverse()
      .map((w, i) => {
        return (
          <WordListHistory
            active={i === 0 ? " active" : ""}
            word={`${i + 1}. ${w}`}
          />
        );
      })
}

export default function WordSection() {
  const [spell, setSpelling] = useState([]);

  const {
    CurrentWord,
    WordHistory,
    setWordHistory,
    WordHistoryEnabled,
    SpellingViewEnabled,
    WordHistoryLength,
    SpecialWordSpelling,
  } = UseMainContext()

  useEffect(() => {
    const letters = CurrentWord.split("");
    setSpelling(letters);

    if (CurrentWord === "" || CurrentWord === "Welcome.") return;
    const newWordHistory = [...WordHistory, CurrentWord];
    if (newWordHistory.length > WordHistoryLength) newWordHistory.shift();
    setWordHistory(newWordHistory);
  }, [CurrentWord]);

  useEffect(() => {
    if (WordHistory.length > WordHistoryLength) {
      const WordHistoryCopy = [...WordHistory];
      const extraItems = WordHistory.length - WordHistoryLength;
      for (let i = 0; i < extraItems; i++) {
        WordHistoryCopy.shift();
      }
      setWordHistory(WordHistoryCopy);
    }
  }, [WordHistoryLength]);

  return (
    <div className="col mx-8 col-lg-4">
      <div class="card text-center">
        <div class="card-body">
          <button
            type="button"
            class="btn btn-outline-warning btn-custom"
            style={{ padding: "5% 2%", color: "black", fontSize: "2.5rem" }}
          >
            {CurrentWord}
          </button>
          {SpellingViewEnabled && (
            <h3 className="mt-1">{GenerateSpellingText(spell, SpecialWordSpelling)}</h3>
          )}
        </div>
      </div>

      {WordHistoryEnabled && (
        <ul class="list-group" style={{maxHeight: "450px", overflowY: "auto"}}>
          {GenerateWordHistoryDisplay(WordHistory)}
        </ul>
      )}
    </div>
  );
}
