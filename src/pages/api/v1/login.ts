import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

import { openDatabase } from "@/lib/db"
import { jwtSecret } from "@/lib/config"
import { Account } from "../../../types";

interface LoginRequestBody {
  username: string;
  password: string;
}

const loginApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = req.body as LoginRequestBody;

    try {
      const database = await openDatabase();
      const Accounts = await database.all<Account[]>(
        `select * from Accounts where username='${data.username}'`
      );

      if (Accounts.length != 0) {
        await compare(data.password, Accounts[0].password!).then((result) => {
          if (result) {
            const jwt = sign(
              {
                id: Accounts[0].id,
                username: Accounts[0].username,
                role: Accounts[0].role,
                name: Accounts[0].name,
              },
              jwtSecret,
              {
                expiresIn: 30 * 60, //Set expire in 30 minute
              }
            );
            res.setHeader(
              "Set-Cookie",
              cookie.serialize("auth", jwt, {
                httpOnly: true,
                maxAge: 30 * 60, //Set expire in 30 minute
                path: "/",
              })
            );
            res.status(200).end();
          } else {
            res.status(403).send({
              message: "Something went wrong!",
            });
          }
        });
      } else {
        res.status(403).send({ message: "Something went wrong!" });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).end();
  }
};
export default loginApi;
