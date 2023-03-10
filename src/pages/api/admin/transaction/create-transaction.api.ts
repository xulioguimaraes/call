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
  if (request.method !== "POST") {
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

  const { description, price, title, type, type_transation } =
    createTransactionSchema.parse(request.body);

  await prisma.transation.create({
    data: {
      price,
      title,
      description,
      type,
      type_transation,
      user_id: session.user.id,
    },
  });
  //   await prisma.userTimeIntervals.createMany

  return response.status(201).end();
}
