import { NextApiRequest, NextApiResponse } from "next";
import { authentication } from "@/middleware"
import { Session } from "../../../types";

const getSessionApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (req.method === "POST") {
    res.status(200).send(session);
  } else {
    res.status(400).end();
  }
};
export default authentication(getSessionApi);
