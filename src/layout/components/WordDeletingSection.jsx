import { useEffect } from "react";
import UseMainContext from "../../contexts/MainContext";
import swal from "sweetalert";

export default function WordDeletingSection() {
  return (
    <div className="col mx-8 col-lg-9">
      <div class="card text-center">
        <div class="card-body">
          <Content />
        </div>
      </div>
    </div>
  );
}

function Content() {
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
    setWordDeletingSectionActive,
  } = UseMainContext();

  function handleDelete(word) {
    swal({
      buttons: {
        Cancel: {
          text: "Cancel",
          value: "cancel",
        },
        Confirm: {
          text: "Confirm",
          value: "confirm",
        },
      },
      title: "Are you sure?",
      text: `You are about to delete ${word}!!`,
    }).then((v) => {
      if (v !== "confirm") return;
      const NewList = [...WordList].filter((item) => item !== word);
      setWordList(NewList);
    });
  }

  useEffect(() => {
    console.log(WordList);
  }, [WordList]);

  return (
    <>
      <ul class="list-group" style={{ maxHeight: "450px", overflowY: "auto" }}>
        {WordList.length > 0 ? (
          WordList.slice()
            .reverse()
            .map((w, i) => {
              return (
                <WordListHistory
                  index={i}
                  word={w}
                  handleDelete={handleDelete}
                />
              );
            })
        ) : (
          <h3>Nothing here.</h3>
        )}
      </ul>
    </>
  );
}

function WordListHistory({ index, word, handleDelete }) {
  return (
    <li
      class={
        "d-flex justify-content-between align-items-center list-group-item"
      }
    >
      {`${index + 1}. ${word}`}
      <button
        type="button"
        class="btn btn-danger btn-sm mx-1 mt-2"
        onClick={() => handleDelete(word)}
      >
        Delete
      </button>
    </li>
  );
}
