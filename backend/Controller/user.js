import User from "../model/user.js";
import CryptoJS from "crypto-js";
const updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    // if there is password to change then fist we encrypt this
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRECT_KEY
      ).toString();
      c;
    }
    try {
      /** @dev updateing user with body  */
      const users = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      /**@dev sending updateted user  */
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else res.status(403).json("You can  update only your account");
};
/** @dev delete something from the user  */
const DeleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      /** @dev feleteing the user account  */
      const users = await User.findByIdAndDelete(req.params.id);
      /**@dev sending updateted user  */
      res.status(200).json("User has been deleted....");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
/** @dev get the one user form db */

const getUser = async (req, res) => {
  // console.log(req.params.id)
  try {
    /** @dev findig usre  account  */
    const users = await User.findById(req.params.id);
    /**@dev sending updateted user  */
    const { password, ...info } = users._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};

/** @dev get all the user  */

const getAllUser = async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      /** @dev if there is query then we are gona return last 10 user and if there is no query then we are gona return all the user of the webapp  */
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      /**@dev sending updateted user  */
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else res.status(403).json("Your are not allowed to see all the user");
};

const getState = async (req, res) => {
  const today = new Date();
  // this will give as last year
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthsArray = [];
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
export { updateUser, DeleteUser, getUser, getAllUser, getState };
