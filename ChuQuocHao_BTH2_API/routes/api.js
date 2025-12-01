import express from "express";
import { getallUsers, getUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to API route 🚀" });
});
router.get("/users/", getallUsers);
router.get("/users/:id", getUserById);

export default router;