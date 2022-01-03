export const getListStart = () => ({
  type: "GET_LISTS_START",
});
export const getListSUCCESS = (List) => ({
  type: "GET_LISTS_SUCCESS",
  payload: List,
});
export const getListfailuer = () => ({
  type: "GET_LISTS_Faliuer",
});
export const deletelistStart = () => ({
  type: "DELETE_LISTS_START",
});
export const DeletelistSUCCESS = (id) => ({
  type: "DELETE_LISTS_SUCCESS",
  payload: id,
});
export const Deletelistfailuer = () => ({
  type: "DELETE_LISTS_Faliuer",
});
export const CreateListStart = () => ({
  type: "CREATE_LISTS_START",
});
export const CreateListSUCCESS = (list) => ({
  type: "CREATE_LISTS_SUCCESS",
  payload: list,
});
export const CreateListfailuer = () => ({
  type: "CREATE_LISTS_Faliuer",
});
// export const updateMovieStart = () => ({
//   type: "UPDATE_MOVIES_START",
// });
// export const updateMovieSUCCESS = (movie) => ({
//   type: "UPDATE_MOVIES_SUCCESS",
//   payload: movie,
// });
// export const updateMoviefailuer = () => ({
//   type: "UPDATE_MOVIES_Faliuer",
// });
