import {
  CreateMoviefailuer,
  CreateMovieStart,
  CreateMovieSUCCESS,
  DeleteMoviefailuer,
  deleteMovieStart,
  DeleteMovieSUCCESS,
  getMoviefailuer,
  getMovieStart,
  getMovieSUCCESS,
  updateMoviefailuer,
  updateMovieStart,
  updateMovieSUCCESS,
} from "./MoviesAction";
import axios from "axios";
export const getMovie = async (dispatch) => {
  dispatch(getMovieStart());
  try {
    const res = await axios.get("/movie", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res);
    dispatch(getMovieSUCCESS(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getMoviefailuer());
  }
};
export const deleteMovie = async (dispatch, id) => {
  dispatch(deleteMovieStart());
  try {
    const res = await axios.delete("/movie/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res);
    dispatch(DeleteMovieSUCCESS(id));
  } catch (error) {
    console.log(error);
    dispatch(DeleteMoviefailuer());
  }
};
export const CreateMovie = async (dispatch, movie) => {
  dispatch(CreateMovieStart());
  try {
    const res = await axios.post("/movie", movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res);
    dispatch(CreateMovieSUCCESS(res.data));
  } catch (error) {
    console.log(error);
    dispatch(CreateMoviefailuer());
  }
};
export const updateMovie = async (dispatch, movie, id) => {
  dispatch(updateMovieStart());
  try {
    const res = await axios.put("/movie/" + id, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res);
    dispatch(updateMovieSUCCESS(res.data));
  } catch (error) {
    console.log(error);
    dispatch(updateMoviefailuer());
  }
};
