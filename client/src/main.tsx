import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppContextProvider from "./contexts/AppContext";
import FirebaseContextProvider from "./contexts/FirebaseContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </FirebaseContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
