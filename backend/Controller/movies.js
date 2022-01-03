import Movies from "../model/movie.js";
/** @dev we are creating  movies */
const CreateMovies = async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movies(req.body);
    try {
      const savemovie = await newMovie.save();
      res.status(200).json(savemovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else res.status(403).json("You are not allowed");
};

/**@dev here we are gona updata movies  */

const UpdataMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovies = await Movies.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
/**@dev here we are gona delete  movies  */

const DeleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovies = await Movies.findByIdAndDelete(req.params.id);
      res.status(200).json("moive has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
/**@dev here we are gona get a  movies  */

const getMovie = async (req, res) => {
  try {
    const Movie = await Movies.findById(req.params.id);
    res.status(200).json(Movie);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**@dev here we are gona get random   movies  */

const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movies;
  try {
    /** what actully it will do is it will serach in whole whole  and give as an smaple  */
    if (type === "series") {
      movies = await Movies.aggregate([
        {
          $match: { isSeries: true },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    } else {
      movies = await Movies.aggregate([
        {
          $match: { isSeries: false },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    }
    /**@dev after getting the result we are gona return over result  */
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getallMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const moive = await Movies.find();
      res.status(200).json(moive.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
/**@dev get the all the movies from the db */

export {
  CreateMovies,
  DeleteMovie,
  UpdataMovie,
  getMovie,
  getRandomMovie,
  getallMovie,
};
