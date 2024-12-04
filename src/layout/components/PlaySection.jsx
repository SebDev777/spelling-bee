import { useContext } from "react";
import UseMainContext from "../../contexts/MainContext";

import * as logos from "../../components/Logos";
import swal from "sweetalert";

export default function PlaySection() {
  const { WordList, setCurrentWord } = UseMainContext();

  function handle() {
    const randomWord = WordList[Math.floor(Math.random() * WordList.length)];
    setCurrentWord(randomWord);
  }

  return (
    <div class="card text-center mt-5">
      <div class="card-body">
        <button
          type="button"
          class="btn btn-outline-warning btn-custom"
          style={{ padding: "2% 32%", color: "black", fontSize: "2rem"}}
          onClick={handle}
        >
          ROLL!  <span><logos.BeeLogo style={{ width: "50px", height: "50px" }} /></span>
        </button>
      </div>
    </div>
  );
}
