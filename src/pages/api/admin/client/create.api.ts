import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { buildNextAuthOption } from "../../auth/[...nextauth].api";

const createClientSchema = z.object({
  name: z.string(),
  observation: z.string(),
  cpf: z.string(),
  date_of_birth: z.string(),
  phone: z.string(),
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
  const { cpf, date_of_birth, name, phone, observation } =
    createClientSchema.parse(request.body);
  const cpfExist = await prisma.clients.findUnique({
    where: {
      cpf,
    },
  });

  if (cpfExist) {
    return response.status(401).json({
      error: true,
      message: "CPF já esta cadastrado",
    });
  }
  await prisma.clients.create({
    data: {
      cpf,
      date_of_birth,
      name,
      phone,
      observation,
      created_at: new Date(),
    },
  });

  return response.status(201).end();
}
