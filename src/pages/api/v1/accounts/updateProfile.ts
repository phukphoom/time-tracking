import { NextApiRequest, NextApiResponse } from "next";
import { openDatabase } from "../../utils/openDatabase";
import { authentication } from "../../middlewares";
import { Session } from "../../../../types";

interface UpdateProfileRequestBody {
  id: number;
  role: string;
  name: string;
}

type RoleLevel = {
  [key: string]: number;
};

const updateProfileApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (req.method === "PUT") {
    if (session.role == "admin" || session.role == "manager") {
      const data = req.body as UpdateProfileRequestBody;

      try {
        const database = await openDatabase();
        const updatedRole = data.role;
        const updaterRole = session.role;

        const levelRole: RoleLevel = { admin: 3, manager: 2, employee: 1 };
        const canUpdate = levelRole[updaterRole] > levelRole[updatedRole];
        if (canUpdate) {
          await database.all(
            `update Accounts set role='${data.role}',name='${data.name}' where id='${data.id}'`
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
export default authentication(updateProfileApi);
