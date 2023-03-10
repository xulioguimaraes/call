import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOption } from "../../auth/[...nextauth].api";

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

  if (!session) {
    return res.status(401).end();
  }
  const { perPage, page } = req.query;

  const currentPage = page ? Number(page) : 1;
  const take = perPage ? Number(perPage) : 10; // Número de registros por página
  const skip = (currentPage - 1) * take; // Número de registros a serem pulados
  const total = await prisma.transation.count();
  const totalPages = Math.ceil(total / take);
  const transation = await prisma.transation.findMany({
    take,
    skip,
    orderBy: {
      created_at: "desc",
    },
  });

  return res
    .status(200)
    .json({ data: transation, perPage, total, page, totalPages });
}
