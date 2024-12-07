import React, { useState, useEffect, useContext } from "react";

import * as bsUtils from "../components/BootstrapUtilities";

import UseMainContext from "../contexts/MainContext";
import PlaySection from "./components/PlaySection";
import SettingSection from "./components/SettingSection";
import TimerSection from "./components/TimerSection";
import WordSection from "./components/WordSection";
import WordDeletingSection from "./components/WordDeletingSection";

export default function CenterPage() {
  const {
    CurrentWord,
    setCurrentWord,
    WordHistory,
    setWordHistory,
    WordHistoryLength,
    WordList,
    WordDeletingSectionActive,
    setWordDeletingSectionActive,
  } = UseMainContext();

  useEffect(() => {
    console.log(WordHistory);
    setWordHistory([]);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <SettingSection />
        {!WordDeletingSectionActive ? (
          <>
            <WordSection />
            <div className="col mx-5 col-lg-4">
              <TimerSection />
              <PlaySection />
            </div>
          </>
        ) : (
          <WordDeletingSection />
        )}
      </div>
    </div>
  );
}
