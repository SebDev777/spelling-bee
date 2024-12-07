import React from "react";
import swal from "@sweetalert/with-react";

function WordListHistory({ active, word }) {
  return (
    <li
      class={
        "d-flex justify-content-between align-items-center list-group-item" +
        active
      }
    >
      {word}
    </li>
  );
}

function NO_BACKUP_AVAIABLE() {
  swal({
    dangerMode: true,
    buttons: false,
    title: "There is no backup avaiable or backup is empty",
  });
}

function VisualizeList(List) {
  return (
    <>
      <ul class="list-group" style={{ maxHeight: "450px", overflowY: "auto" }}>
        {List.length > 0 ? (
          List.slice()
            .reverse()
            .map((w, i) => {
              return (
                <WordListHistory
                  active={i === 0 ? " active" : ""}
                  word={`${i + 1}. ${w}`}
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

export function DeleteAllWordsHandle(WordList, setWordList, setWordListBackUp) {
  if (WordList.length === 0) {
    swal({
      title: "Nothing to delete",
      dangerMode: true,
      text: "No items avaiable to delete.",
      buttons: false,
    });
    return;
  }

  swal({
    title: "Are you sure?",
    text: `You will delete (${WordList.length}) items.`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      setWordListBackUp(WordList);
      setWordList([]);
      swal({
        buttons: {
          OK: {
            text: "Exit",
          },
        },
        content: (
          <div>
            <h4>Poof! Everything has been deleted!</h4>
            <h6>-- A backup was automatically created..</h6>
          </div>
        ),
        icon: "success",
      });
    } else {
      swal("The list is safe!");
    }
  });
}

export function ViewWordListHandle(WordList, setWordList, WordListBackUp) {
  swal({
    buttons: {
      restore: WordList.length === 0 && {
        text: "Backup",
        value: "Restore",
      },
      addWord: WordList.length === 0 && {
        text: "Add a word",
        value: "Add",
      },
      OK: {
        text: "Exit",
      },
    },
    content: (
      <div>
        <h5>Avaiable Words:</h5>
        {VisualizeList(WordList)}
      </div>
    ),
  }).then((value) => {
    switch (value) {
      case "Add":
        WordAddHandle(WordList, setWordList);
        break;
      case "Restore":
        if (WordListBackUp.length > 0) {
          swal({
            title: "You are about to add:",
            dangerMode: true,
            icon: "warning",
            content: <div>{VisualizeList(WordListBackUp)}</div>,
          }).then((value) => {
            if (!value) return;
            setWordList(WordListBackUp);
            swal("Successfully added the words in the back-up!", {
              icon: "success",
            });
          });
        } else {
          NO_BACKUP_AVAIABLE();
        }
        break;
      default:
        break;
    }
  });
}

export function WordAddHandle(WordList, setWordList) {
  swal({
    content: {
      element: "input",
      attributes: {
        placeholder: "Type the word here.",
      },
    },
  }).then((value) => {
    if (!value) return;
    const words = [...WordList, value];
    setWordList(words);
    swal(`You added: ${value}`).then(() => {
      ViewWordListHandle(words, setWordList);
    });
  });
}

function NOTHING() {
  swal({
    dangerMode: true,
    title: "There is nothing to add.",
    buttons: true,
  });
}

export function FileWordsAddHandle(FileWords, WordList, setWordList) {
  if (!FileWords) return NOTHING();
  if (FileWords.length === 0) return NOTHING();

  const fileList = VisualizeList(FileWords);
  const temp_backup = [...WordList]

  console.log(FileWords);
  swal({
    title: "You are about to add:",
    dangerMode: true,
    buttons: {
      dec: {
        text: "Decline",
        value: "Decline",
      },
      acc: {
        text: "Accept",
        value: "Accept",
      },
    },
    content: <div>{fileList}</div>,
  }).then((value) => {
    if (value !== "Accept") return
    setWordList([...WordList, ...FileWords])
    swal({
      title: "Successfully added these items:",
      icon: "success",
      content: (<div>{
        VisualizeList(FileWords)
      }</div>),
    }).then(() => {
      swal({
        title: "Added these:",
        icon: "info",
        buttons: {
          rev: {
            text: "Reverse",
            value: "reverse"
          },
          ok: {
            text: "Exit"
          }
        },
        content: (<div>
          {VisualizeList(FileWords)}
        </div>)
      }).then((value) => {
        if (value !== "reverse") return
        setWordList(temp_backup)
        swal({
          title: "Reversed.",
          icon: "success"
        })
      })
    })
  });
}

export function ResetWordSectionHandle(setCurrentWord, setWordHistory) {
  swal({
    dangerMode: true,
    buttons: true,
    icon: "warning",
    content: (
      <div>
        <h3>Are you sure?</h3>
        <h4>
          You will clear everything in the word section.{" "}
          <em>This includes: Current-word display and word history.</em>{" "}
        </h4>
      </div>
    ),
  }).then((accepted) => {
    if (!accepted) return;
    setCurrentWord("Welcome.");
    setWordHistory([]);
    swal({
      title: "Successfully reset.",
      icon: "success",
    });
  });
}