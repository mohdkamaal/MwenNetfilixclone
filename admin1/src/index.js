import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/Aurhcontext/Authcontext";
import { ListsContextProvider } from "./context/listContext/listcontext";

import {
  MoviesContext,
  MoviesContextProvider,
} from "./context/Moviecontext/MoviesContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MoviesContextProvider>
        <ListsContextProvider>
          <App />
        </ListsContextProvider>
      </MoviesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
