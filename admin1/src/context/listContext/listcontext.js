import { createContext, useEffect, useReducer } from "react";
import ListReducer from "./listReducer";

const INITIAL_STATE = {
  Lists: [],
  isFetching: false,
  error: false,
};

export const ListsContext = createContext(INITIAL_STATE);

export const ListsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE);

  return (
    <ListsContext.Provider
      value={{
        Lists: state.Lists,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};
