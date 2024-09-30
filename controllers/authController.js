import { getUserByUsername, createUser } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Supply username and password" });
  }
  try {
    const user = await getUserByUsername(username);

    if (user === undefined) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const storedPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      storedPasswordHash
    );

    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return res
        .status(200)
        .json({ message: "Correct username and password", token: token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error while logging in" });
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
    res.status(500).json({ error: "Server error while creating users" });
  }
};
