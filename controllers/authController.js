import { getUserByUsername, createUser } from "../models/User.js";
import bcrypt from "bcrypt";
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Supply username and password" });
  }
  try {
    const user = await getUserByUsername(username);

    const passwordHash = user.password;
    if (user == undefined) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const match = await bcrypt.compare(password, passwordHash);
    if (match) {
      return res.status(200).json({ message: "Correct username and password" });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error while creating user" });
  }
};

export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await getUserByUsername(username);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      console.log(username, password, email, role);
      const newUser = await createUser(username, email, password, role);
      return res.status(201).json(newUser);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error while creating users" });
  }
};
