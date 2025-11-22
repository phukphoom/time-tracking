import { NextApiRequest, NextApiResponse } from "next";
import { openDatabase } from "@/lib/db"
import { authentication } from "@/middleware"
import { Session } from "../../../../../types";

interface ClockInRequestBody {
  clockingTime: string;
}

const clockInApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (req.method === "POST") {
    const data = req.body as ClockInRequestBody;

    try {
      const database = await openDatabase();
      await database.all(
        `insert into Clocking('accountId', 'clockingType',clockingTime) values('${session.id}', 'clock-in','${data.clockingTime}')`
      );

      res.status(200).end();
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).end();
  }
};
export default authentication(clockInApi);
