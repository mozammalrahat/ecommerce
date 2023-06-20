import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.authorization) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log("Auth.js file ", userId);
    return res.status(200).json({ userId });
  } catch (error) {
    console.error(error);
    return res.status(403).send("Invalid token");
  }
};

export default handler;
