import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import moviesRoute from "./Routes/movies.js";
import listRoute from "./Routes/list.js";
const app = express();

dotenv.config();
app.use(express.json());

/** @dev connecting to mongoDb */

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("connneted to mongodb"))
  .catch((err) => console.log(err));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movie", moviesRoute);
app.use("/api/list", listRoute);

const port = process.env.PORT || 9009;
app.listen(port, () => console.log(`Listening on ${port}`));
