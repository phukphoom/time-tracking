import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

import { openDatabase } from "../../utils/openDatabase";
import { hashSalt } from "../../utils/config";
import { authentication } from "../../middlewares";
import { Session } from "../../../../types";

interface CreateAccountRequestBody {
  username: string;
  password: string;
  role: string;
  name: string;
}

const createAccountApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (req.method === "POST") {
    if (session.role == "admin" || session.role == "manager") {
      const data = req.body as CreateAccountRequestBody;
      const hashedPassword = await hash(data.password, hashSalt);

      try {
        const database = await openDatabase();
        await database.all(
          `insert into Accounts(username, password, role, name) values('${data.username}','${hashedPassword}','${data.role}','${data.name}')`
        );

        res.status(200).end();
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
export default authentication(createAccountApi);
