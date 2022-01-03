import List from "../model/list.js";
/** @dev here we are creating list of the movies*/
const createList = async (req, res) => {
  const newlist = await new List(req.body);

  try {
    const savedList = await newlist.save();

    res.status(200).json(savedList);
  } catch (error) {
    res.status(403).json(error);
  }
};
/** @dev here we are gona delete the list of the movies */

const deleteList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json(" the list has been delete ffom the db");
    } catch (error) {
      res.status(500).json("you are not allowd to delete ");
    }
  }
};
/**@dev this will get all the movies accroding query */
const getMovieByChoice = async (req, res) => {
  const typeQuery = req.query.type;
  const generQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (generQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: generQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createList, deleteList, getMovieByChoice };
