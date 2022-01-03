import { createContext, useEffect, useReducer } from "react";
import MoivesReducer from "./MoviesReducer";

const INITIAL_STATE = {
  movies: [],
  isFetching: false,
  error: false,
};

export const MoviesContext = createContext(INITIAL_STATE);

export const MoviesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MoivesReducer, INITIAL_STATE);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
