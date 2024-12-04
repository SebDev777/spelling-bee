import React, { useState, createContext, useEffect } from "react";
import TopPage from "./layout/TopPage";
import CenterPage from "./layout/CenterPage";

import swal from "@sweetalert/with-react";
import "./App.css"


import { MainContextProvider } from "./contexts/MainContext";

const password = "OK"

function passwordPrompt() {
  return swal({
    dangerMode: true,
    title: "Verification",
    content: {
      element: "input",
      attributes: {
        placeholder: "Type the password here.",
      },
    },
  }).then(v => {
    console.log(v)
    if (!v || v === "") {
      swal({
        dangerMode: true,
        title: "Type a password",
        buttons: false
      }).then(passwordPrompt)
      return
    }
    if (v !== password) {
      swal({
        dangerMode: true,
        title: "Incorrect password",
        buttons: false
      }).then(passwordPrompt)
    } else {
      swal({
        icon: "success",
        title: "Entered!",
        buttons: false,
        content: (
          <div>
            <h4>Now you can view & use the page.</h4>
          </div>
        )
      })
    }
  })
}

function VERIFICATION() {
  swal({
    icon: "info",
    title: "Disclaimer",
    content: (
      <div>
        <h4>This page was made to medium or big screen sizes, small sizes may have display problems.</h4>
      </div>
    )
  }).then(() => {
    passwordPrompt()
  })
}

function App() {
  useEffect(() => {
    VERIFICATION()
  }, [])

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
