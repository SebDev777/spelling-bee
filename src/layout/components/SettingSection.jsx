import * as bsUtils from "../../components/BootstrapUtilities";

import React, { useState } from "react";
import Credits from "../Credits";

import UseMainContext from "../../contexts/MainContext";
import { BeeLogo } from "../../components/Logos";
import {
  WordAddHandle,
  ViewWordListHandle,
  DeleteAllWordsHandle,
  ResetWordSectionHandle,
  FileWordsAddHandle,
  WordDeletingSectionHandle
} from "../../logic/WordsHandle";

import * as BootstrapUtils from "../../components/BootstrapUtilities";

import swal from "sweetalert";

export default function SettingSection() {
  const {
    CurrentWord,
    setCurrentWord,
    WordHistory,
    setWordHistory,
    WordHistoryEnabled,
    setWordHistoryEnabled,
    SpellingViewEnabled,
    setSpellingViewEnabled,
    WordHistoryLength,
    setWordHistoryLength,
    WordList,
    setWordList,
    WordListBackUp,
    setWordListBackUp,
    SpecialWordSpelling,
    setSpecialWordSpelling,
    WordDeletingSectionActive, 
    setWordDeletingSectionActive
  } = UseMainContext();

  const [ FileWords, setFileWords ] = useState([])

  function handleSelectChange(event) {
    setWordHistoryLength(event.target.value);
  }

  function handleFile(event) {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = function (e) {
        const text = e.target.result; // File content
        const words = text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g) || [];  
        setFileWords(words)
        console.log(words); // Here, `words` is the array of all words in the file
      };

      reader.readAsText(file); // Read the file as text
    } else {
      alert("Please upload a .txt file.");
    }
  }

  const content = (
    <>
      <BlueBar />
      <h4>Word Section</h4>

      <div class="form-check form-switch mt-3">
        <BootstrapUtils.toggleInput
          content={`Word History`}
          checked={WordHistoryEnabled}
          onChange={() => {
            setWordHistoryEnabled(!WordHistoryEnabled); // Toggle the checkbox state
          }}
        />
      </div>

      <div class="form-check form-switch mt-2">
        <BootstrapUtils.toggleInput
          content={`See spelling`}
          checked={SpellingViewEnabled}
          onChange={() => {
            setSpellingViewEnabled(!SpellingViewEnabled); // Toggle the checkbox state
          }}
        />
      </div>

      <div class="form-check form-switch mt-2">
        <BootstrapUtils.toggleInput
          content={`Enable special letter spelling`}
          checked={SpecialWordSpelling}
          onChange={() => {
            setSpecialWordSpelling(!SpecialWordSpelling); // Toggle the checkbox state
          }}
        />
      </div>

      <div class="form-check form-switch mt-2">
        <BootstrapUtils.toggleInput
          content={`Enable word deleting section`}
          checked={WordDeletingSectionActive}
          onChange={() => {
            setWordDeletingSectionActive(!WordDeletingSectionActive); // Toggle the checkbox state
          }}
        />
      </div>

      <div class="input-group">
        <h6 class="mt-2">Max visible words in history</h6>
        <BootstrapUtils.FormSelect
          onChange={handleSelectChange}
          options={
            <>
              <BootstrapUtils.FormSelectOption value={4} defaultValue={true} />
              <BootstrapUtils.FormSelectOption value={6} />
              <BootstrapUtils.FormSelectOption value={8} />
              <BootstrapUtils.FormSelectOption value={10} />
            </>
          }
        />
      </div>

      <div class="input-group mb-3 mt-2">
        <button
          class="btn btn-primary"
          type="button"
          onClick={() => FileWordsAddHandle(FileWords, WordList, setWordList)}
        >
          Apply
        </button>
        <input
          type="file"
          class="form-control"
          accept=".txt"
          id="inputGroupFile03"
          aria-describedby="inputGroupFileAddon03"
          aria-label="Upload"
          onChange={handleFile}
        ></input>
      </div>
      <HandleOptions />

      <BlueBar />
      <Credits />
    </>
  );

  return (
    <div className="col-1 full-height d-flex align-items-center col-lg-2">
      <bsUtils.OffCanvas
        title={
          <h1>
            Configurations <BeeLogo style={{ width: "50px", height: "50px" }} />{" "}
          </h1>
        }
        name={"Settings"}
        content={content}
      />
    </div>
  );
}

function BlueBar() {
  return <hr class="border border-primary border-2 mt-3 mb-3"></hr>;
}

function HandleOptions() {
  const {
    CurrentWord,
    setCurrentWord,
    WordHistory,
    setWordHistory,
    WordHistoryEnabled,
    setWordHistoryEnabled,
    SpellingViewEnabled,
    setSpellingViewEnabled,
    WordHistoryLength,
    setWordHistoryLength,
    WordList,
    setWordList,
    WordListBackUp,
    setWordListBackUp,
  } = UseMainContext();

  return (
    <div class="mt-2">
      <button
        type="button"
        class="btn btn-primary btn-sm"
        onClick={() => WordAddHandle(WordList, setWordList)}
      >
        Add a word
      </button>
      <button
        type="button"
        class="btn btn-primary btn-sm mx-2"
        onClick={() =>
          ViewWordListHandle(WordList, setWordList, WordListBackUp)
        }
      >
        View word list
      </button>
      <button
        type="button"
        class="btn btn-danger btn-sm mx-1"
        onClick={() =>
          DeleteAllWordsHandle(WordList, setWordList, setWordListBackUp)
        }
      >
        Delete All Words
      </button>
      <button
        type="button"
        class="btn btn-danger btn-sm mx-1 mt-2"
        onClick={() => ResetWordSectionHandle(setCurrentWord, setWordHistory)}
      >
        Reset word section
      </button>
    </div>
  );
}
