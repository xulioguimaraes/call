import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { buildNextAuthOption } from "../../auth/[...nextauth].api";

const createTransactionSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  type: z.boolean(),
  type_transation: z.number(),
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "DELETE") {
    return response.status(405).end();
  }

  const session = await getServerSession(
    request,
    response,
    buildNextAuthOption(request, response)
  );

  if (!session) {
    return response.status(401).end();
  }
  const { id } = request.query;

  await prisma.transation.delete({
    where: { id: String(id) },
  });

  return response.status(201).json(request.query);
}
