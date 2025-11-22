import { NextApiRequest, NextApiResponse } from "next";
import { openDatabase } from "@/lib/db"
import { authentication } from "@/middleware"
import { Session, Account } from "../../../../types";

const getAccountsApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (req.method === "GET") {
    if (session.role == "admin" || session.role == "manager") {
      try {
        const database = await openDatabase();
        const Accounts = await database.all<Account[]>(
          "select id, username, role, name from Accounts"
        );

        res.status(200).send(Accounts);
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    } else {
      res.status(403).send({ message: "No Permission!" });
    }
  } else {
    res.status(400).end();
  }
};
export default authentication(getAccountsApi);
