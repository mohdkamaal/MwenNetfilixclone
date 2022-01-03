import {
  CreateListfailuer,
  CreateListStart,
  CreateListSUCCESS,
  Deletelistfailuer,
  deletelistStart,
  DeletelistSUCCESS,
  getListfailuer,
  getListStart,
  getListSUCCESS,
  getMovieStart,
} from "./listAction";
import axios from "axios";
export const getLists = async (dispatch) => {
  dispatch(getListStart());
  try {
    const res = await axios.get("/list", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res);
    dispatch(getListSUCCESS(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getListfailuer());
  }
};
export const deleteLists = async (dispatch, id) => {
  dispatch(deletelistStart());
  try {
    const res = await axios.delete("/list/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res);
    dispatch(DeletelistSUCCESS(id));
  } catch (error) {
    console.log(error);
    dispatch(Deletelistfailuer());
  }
};
export const CreateLists = async (dispatch, list) => {
  dispatch(CreateListStart());
  try {
    const res = await axios.post("/list", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res);
    dispatch(CreateListSUCCESS(res.data));
  } catch (error) {
    console.log(error);
    dispatch(CreateListfailuer());
  }
};
