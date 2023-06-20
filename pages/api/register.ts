import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "users.json");

interface User {
  phone: string;
  password: string;
  role?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("File Path is: ", filePath);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  } else {
    try {
      const { phone, password, role } = req.body;

      // Read the existing users data from the JSON file
      let users: User[] = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        users = fileData ? JSON.parse(fileData) : [];
      }
      console.log("Users: ", users);
      // Check if the user already exists
      const existingUser = users.find((user: User) => user.phone === phone);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: User = { phone, password: hashedPassword, role };
      users.push(newUser);

      fs.writeFileSync(filePath, JSON.stringify(users));

      res.status(200).json({ message: "User created successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
