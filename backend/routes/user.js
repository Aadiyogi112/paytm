const express = require("express");
const User = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

const secret = require("../config.js");

const userRouter = express.Router();

const signupSchema = zod.object({
  username: zod.string().min(3).max(30),
  password: zod.string().min(6),
  firstName: zod.string().min(3).max(30),
  lastName: zod.string().min(3).max(30),
});

const updatebodySchema = zod.object({
  password: zod.string().min(6),
  firstName: zod.string().min(3).max(30),
  lastName: zod.string().min(3).max(30),
});

// Routes

userRouter.post("/signup", async (req, res) => {
  const body = req.body;

  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Email Already Taken/ Incorrect inputs",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.status(411).json({
      message: "Email Already Taken/ Incorrect inputs",
    });
  }

  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    secret
  );
  res.status(200).json({
    message: "User Created successfully",
    token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const username = req.body.username;

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.send("Please SignUp first/Incorrect Parameters");
  }

  const decoded = jwt.verify(token, secret);
  const userId = decoded.userId;

  const user = await User.findById(userId);

  if (user.username !== username) {
    return res.send("Incorrect username");
  }

  res.json({
    message: "Signin Successful",
    token,
  });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updatebodySchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  await User.findByIdAndUpdate(req.userId, req.body);

  res.json({
    message: "Updated Successfully",
  });
});

module.exports = userRouter;
