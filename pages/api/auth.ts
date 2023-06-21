import type { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";
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

    const jwtSecret: Secret = process.env.JWT_SECRET || "REPLIQ";
    const token = req.headers.authorization;

    let phone: string | undefined;

    if (typeof token === "string") {
      const decodedToken = jwt.verify(token, jwtSecret);
      if (typeof decodedToken === "string") {
        phone = decodedToken;
      } else if (typeof decodedToken === "object" && decodedToken !== null) {
        phone = decodedToken.phone;
      }
    }

    if (!phone) {
      return res.status(403).send("Invalid token");
    }

    const existingUser = users.find((user: User) => user.phone === phone);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = { phone, role: existingUser.role };
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(403).send("Invalid token");
  }
};

export default handler;
