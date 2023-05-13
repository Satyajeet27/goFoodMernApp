const { Router } = require("express");
const User = require("../model/user");
const { validationResult, body } = require("express-validator");

const router = Router();

router.post(
  "/createuser",
  body("name").isLength({ min: 5 }),
  body("email").isEmail(),
  body("password", "password length should be atleast 6").isLength({ min: 6 }),
  async (req, res) => {
    const { name, email, password, location } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }
    try {
      await User.create({
        name,
        email,
        location,
        password,
      });
      return res.status(201).send({ message: "user created" });
    } catch (error) {
      console.log(error);
      return res.status(401).send({ error: "error in creating user" });
    }
  }
);

router.post(
  "/login",
  body("email", "please enter valid email").isEmail(),
  async (req, res) => {
    const { email, password } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send({ error: "user not found" });
      if (password !== user.password)
        return res.status(400).send({ error: "Incorrect Password" });
      return res.send({ message: "user found" });
    } catch (err) {
      console.log(err);
      res.send({ error: "error in request" });
    }
  }
);
module.exports = router;
