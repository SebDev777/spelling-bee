import React, { useState, createContext, useEffect } from "react";
import TopPage from "./layout/TopPage";
import CenterPage from "./layout/CenterPage";

import "./App.css";

import { MainContextProvider } from "./contexts/MainContext";
import VerificationPrompt from "./logic/Verification";

function Main() {
  return (
    <div className="App">
      <div className="background-container">
        <div className="content">
          <TopPage />
          <hr
            class="border border-warning border-5"
            style={{ borderColor: "rgb(238, 212, 159)" }}
          ></hr>
          <CenterPage />
        </div>
      </div>
    </div>
  );
}

function WaitingPage() {
  return (
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status" style={{width: "10rem", height: "10rem"}}>
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function App() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    VerificationPrompt(setVerified);
  }, []);

  return (
    <MainContextProvider>
      {verified ? <Main /> : <WaitingPage />}
    </MainContextProvider>
  );
}

export default App;
