import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

import { openDatabase } from "../../utils/openDatabase";
import { hashSalt } from "../../utils/config";
import { authentication } from "../../middlewares";
import { Session } from "../../../../types";

interface ChangePasswordRequestBody {
  id: number;
  password: string;
}

type RoleLevel = {
  [key: string]: number;
};

const changePasswordApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (req.method === "PUT") {
    if (session.role == "admin" || session.role == "manager") {
      const data = req.body as ChangePasswordRequestBody;
      const hashedPassword = await hash(data.password, hashSalt);

      try {
        const database = await openDatabase();
        const updatedAccount = await database.all<any[]>(
          `select role from Accounts where id='${data.id}'`
        );
        const updatedRole = updatedAccount[0].role;
        const updaterRole = session.role;

        const levelRole: RoleLevel = { admin: 3, manager: 2, employee: 1 };
        const canUpdate = levelRole[updaterRole] > levelRole[updatedRole];
        if (canUpdate) {
          await database.all(
            `update Accounts set password='${hashedPassword}' where id='${data.id}'`
          );
          res.status(200).end();
        } else {
          res.status(403).send({ message: "No Permission!" });
        }
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
export default authentication(changePasswordApi);
