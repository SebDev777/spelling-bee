import React, { useState, createContext, useEffect } from "react";
import TopPage from "./layout/TopPage";
import CenterPage from "./layout/CenterPage";
import "./App.css"

import { MainContextProvider } from "./contexts/MainContext";

function App() {
  return (
    <MainContextProvider>
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
    </MainContextProvider>
  );
}

export default App;
