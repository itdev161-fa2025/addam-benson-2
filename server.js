import express from "express";
import connectDatabase from "./config/db.js";
import { check, validationResult } from "express-validator";
import cors from "cors";
import Chore from "./models/ChoreModel.js";

const app = express();

connectDatabase();

//middlewares
app.use(express.json({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => res.send("api ping sent"));

app.post(
  "/api/users",
  [
    check("name", "Please enter your name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a pasword with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      res.send(res.body);
    }
  }
);

//#region Register
/**
 * @route POST api/chore
 * @desc Register/create chore
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
      return res.status(422).json({ errors: errors.array() });
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
