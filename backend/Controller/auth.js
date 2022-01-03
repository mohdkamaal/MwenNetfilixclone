import User from "../model/user.js";
import CryptoJS from "crypto-js";
import router from "../Routes/auth.js";
import JWT from  'jsonwebtoken'
const register_User = async (req, res) => {
  /**@dev secureing password of the user  */

  const password = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.SECRECT_KEY
  ).toString();

  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: password,
  });

  try {
    const user = await newUser.save();

    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
/** @dev doing login to the site */
const login_User = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.json("wrong password of user name");
    /** @dev decrpting password of user  */
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRECT_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    console.log(originalText);

    /** compairing password if the are not same then return error else return user info */
    originalText !== req.body.password &&
      res.status(401).json("wrong password of user name");

const accessToken  = JWT.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRECT_KEY,{expiresIn:"5d"})

    /** we dont need password to return becuase we are storing it to over local storage
     * this will remove the password from the user and return other info that we need to login
     */

    const { password, ...info } = user._doc;
    res.status(200).json({...info,accessToken});
  } catch (error) {
    res.status(404).json(error);
  }
};
export { register_User, login_User };
