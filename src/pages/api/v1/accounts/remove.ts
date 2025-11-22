import { NextApiRequest, NextApiResponse } from "next";
import { openDatabase } from "@/lib/db"
import { authentication } from "@/middleware"
import { Session } from "../../../../types";

interface RemoveAccountRequestBody {
  id: number;
}

type RoleLevel = {
  [key: string]: number;
};

const removeAccountApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (req.method === "POST") {
    if (session.role == "admin" || session.role == "manager") {
      const data = req.body as RemoveAccountRequestBody;

      try {
        const database = await openDatabase();
        const deletedAccount = await database.all<any[]>(
          `select role from Accounts where id='${data.id}'`
        );
        const deletedRole = deletedAccount[0].role;
        const deleterRole = session.role;

        const levelRole: RoleLevel = { admin: 3, manager: 2, employee: 1 };
        const canDelete = levelRole[deleterRole] > levelRole[deletedRole];
        if (canDelete) {
          await database.all(`delete from Accounts where id='${data.id}'`);
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
export default authentication(removeAccountApi);
