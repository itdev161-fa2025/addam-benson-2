import express from "express";
import connectDatabase from "./config/db.js";
import { check, validationResult } from "express-validator";
import cors from "cors";
import Chore from "./models/ChoreModel.js";
import User from "./models/UserModel.js";
import encryption from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "./middleware/auth.js";
import c from "./config/db.js";

const app = express();

connectDatabase();
const { getSalt, hash } = encryption;
//middlewares
app.use(express.json({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));
app.get("/", (req, res) => res.send("api ping sent"));

//#region Register User
app.post(
  "/api/user",
  [
    check("name", "Please enter your name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail().not().isEmpty(),
    check(
      "password",
      "Please enter a pasword with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });
        await newUser.save();
        res.status(200).send(newUser);
      } catch (error) {
        res.status(500).send("Server Error");
      }
    }
  }
);

//#region Get Users
/**
 *
 * @route GET api/user
 * @desc Get users
 */
app.get("/api/user", async (req, res) => {
  try {
    let users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
  // return res;
});
//#endregion
//#region Authenticate
/**
 * @route GET api/auth
 * @desc Authenticate user
 */
app.get("/api/auth", auth, async (req, res) => {
  try {
    const user = await findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
});
//#endregion
//#region Add new chore
/**
 * @route POST api/chore
 * @desc Create chore for list
 */
app.post(
  "/api/chore",
  [
    check("title", "Please enter a new chore!").not().isEmpty(),
    check("description", "Describe what needs to be done").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).JSON({ errors: errors.array() });
    } else {
      const { title, description } = req.body;
      try {
        //Create new chore
        const newChore = new Chore({
          title: title,
          description: description,
        });
        await newChore.save();
        res.status(200).send(newChore);
      } catch (error) {
        res.status(500).send("Server Error");
      }
    }
  }
);
//#endregion
//#region GetAllChores
/**
 *
 * @route GET api/chore
 * @desc Get chores for list
 */
app.get("/api/chore", async (req, res) => {
  try {
    let chores = await Chore.find({});
    return res.status(200).send(chores);
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
  // return res;
});
//#endregion
const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));
