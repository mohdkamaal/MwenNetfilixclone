import { List } from "@material-ui/core";

const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS_START":
      return {
        Lists: [],
        isFetching: true,
        error: false,
      };
    case "GET_LISTS_SUCCESS":
      return {
        Lists: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_LISTS_Faliuer":
      return {
        Lists: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_LISTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_LISTS_SUCCESS":
      return {
        Lists: state.Lists.filter((item) => item._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_LISTS_Faliuer":
      return {
        Lists: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_LISTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_LISTS_SUCCESS":
      return {
        Lists: [...state.Lists, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_LISTS_Faliuer":
      return {
        Lists: [],
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default ListReducer;
