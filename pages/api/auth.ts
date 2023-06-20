import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "users.json");

interface User {
  phone: string;
  password: string;
  role?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.authorization) {
    return res.status(401).send("No authorization token");
  }

  try {
    let users: User[] = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      users = fileData ? JSON.parse(fileData) : [];
    }

    let { phone } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const existingUser = users.find((user: User) => user.phone === phone);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = { phone, role: existingUser.role };
    console.log("user is :", user);
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(403).send("Invalid token");
  }
};

export default handler;
