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
  if (request.method !== "GET") {
    return response.status(405).end();
  }

  const session = await getServerSession(
    request,
    response,
    buildNextAuthOption(request, response)
  );

  // if (!session) {
  //   return response.status(401).end();
  // }
  const { per_page, page } = request.query;

  const current_page = page ? Number(page) : 1;
  const take = per_page ? Number(per_page) : 10; // Número de registros por página
  const skip = (current_page - 1) * take; // Número de registros a serem pulados
  const total = await prisma.clients.count();
  const total_pages = Math.ceil(total / take);
  const attendant = await prisma.user.findMany({
    take,
    skip,
    orderBy: {
      create_at: "desc",
    },
    select:{
      name: true,
      avatar_url: true,
      id: true,
    }
    // where: {
    //     doctor: true
    // }
  });

  return response
    .status(200)
    .json({ data: attendant, per_page, total, page, total_pages });

}
