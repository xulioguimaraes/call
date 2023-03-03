import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOption } from "../auth/[...nextauth].api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOption(req, res)
  );

  //   if (!session) {
  //     return res.status(401).end();
  //   }

  const transation = await prisma.transation.findMany({ take: 4, orderBy: {
    created_at: "desc"
  } });

  return res.status(200).json(transation);
}
