import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { Session } from "../../../types";

import { jwtSecret } from "../utils/config";

type AuthenticatedHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => Promise<void | any>;

const authentication = (func: AuthenticatedHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session = verify(req.cookies.auth, jwtSecret) as Session;
      return await func(req, res, session);
    } catch (error) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
  };
};
export default authentication;
