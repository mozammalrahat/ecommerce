import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
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
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  } else {
    try {
      const user = req.body;

      if (!user) {
        return res.status(400).json({ message: "User data is missing" });
      }

      let users: User[] = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        users = fileData ? JSON.parse(fileData) : [];
      }

      const { phone, password, role } = user;

      // Check if the user already exists
      const existingUser = users.find((u) => u.phone === phone);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: User = {
        phone,
        password: hashedPassword,
        role,
      };

      users.push(newUser);

      fs.writeFileSync(filePath, JSON.stringify(users));

      res.status(200).json({ message: "User added successfully", users });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
