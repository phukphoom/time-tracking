import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const logoutApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", "", {
        maxAge: -1,
        path: "/",
      })
    );

    res.writeHead(302, { Location: "/login" });
    res.end();
  } else {
    res.status(400).end();
  }
};
export default logoutApi;
