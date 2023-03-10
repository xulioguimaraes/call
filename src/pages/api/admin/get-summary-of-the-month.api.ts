import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/utils/format-price";
import { sumOfPrices } from "@/utils/sum-of-prices";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOption } from "../auth/[...nextauth].api";
interface ITransactions {
  id: string;
  price: number;
  description: string;
  type: boolean;
  created_at: Date;
  user_id: string;
  type_transation: boolean;
  title: string;
}

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

  const finalDate = dayjs(new Date()).toDate();
  const mounth = finalDate.getMonth();
  const year = finalDate.getFullYear();
  const inicialDate = dayjs(new Date(year, mounth, 1)).toDate();

  const transation: Array<ITransactions> = await prisma.$queryRaw`
    SELECT 
     *
    FROM transations 

    WHERE created_at BETWEEN ${inicialDate} AND ${finalDate} 
  `;

  const finalMonthLast = dayjs(finalDate).subtract(1, "month").toDate();
  const lastMonth = finalMonthLast.getMonth();
  const yearLastMounth = finalMonthLast.getFullYear();
  const inicialDateLastMonth = dayjs(
    new Date(yearLastMounth, lastMonth, 1)
  ).toDate();

  const transationLastMonth: Array<ITransactions> = await prisma.$queryRaw`
    SELECT 
     *
    FROM transations 

    WHERE created_at BETWEEN ${inicialDateLastMonth} AND ${finalMonthLast} 
  `;

  const last_input_date: Array<{ last_input_date: Date }> =
    await prisma.$queryRaw`
    SELECT 
      created_at as last_input_date
    FROM transations 

    WHERE type = true
    ORDER BY created_at DESC
    LIMIT 1
  `;
  const last_output_date: Array<{ last_output_date: Date }> =
    await prisma.$queryRaw`
  SELECT 
    created_at as last_output_date
  FROM transations 

  WHERE type = false
  ORDER BY created_at DESC
  LIMIT 1
`;

  //soma dos entradas do mês passado
  const sumPriceLastMonthInputs =
    sumOfPrices(true, transationLastMonth) / 10000;
  //soma das entradas do mês atual
  const sumPriceCurrentMonthInputs = sumOfPrices(true, transation) / 10000;

  //soma das saidas do mês passado
  const sumPriceLastMonthOutputs =
    sumOfPrices(false, transationLastMonth) / 10000;
  //soma das saidas do mês atual
  const sumPriceCurrentMonthOutputs = sumOfPrices(false, transation) / 10000;

  const diffInput = sumPriceCurrentMonthInputs - sumPriceLastMonthInputs;
  const diffOutput = sumPriceCurrentMonthOutputs - sumPriceLastMonthOutputs;

  const percentageInput = (diffInput / sumPriceLastMonthInputs) * 100;
  const percentageOutput = (diffOutput / sumPriceLastMonthOutputs) * 100;

  const inputs = formatPrice(sumPriceCurrentMonthInputs);

  const outputs = formatPrice(sumPriceCurrentMonthOutputs);

  const totalPriceCurrentMonth =
    sumPriceCurrentMonthInputs - sumPriceCurrentMonthOutputs;

  const totalPriceLastMonth =
    sumPriceLastMonthInputs - sumPriceLastMonthOutputs;

  const percentageTotal =
    ((totalPriceCurrentMonth - totalPriceLastMonth) / totalPriceLastMonth) *
    100;

  const totalCurrentMonth = formatPrice(totalPriceCurrentMonth);
  // {(valor final – valor inicial) / valor inicial} * 100
  const input = {
    value: inputs,
    percentage: percentageInput.toFixed(2),
    date_last_trasnsation: last_input_date[0]?.last_input_date,
  };
  const output = {
    value: outputs,
    percentage: percentageOutput.toFixed(2),
    date_last_trasnsation: last_output_date[0]?.last_output_date,
  };
  const total = {
    value: totalCurrentMonth,
    percentage: percentageTotal.toFixed(2),
    date_last_trasnsation: null
  };
  return res.status(200).json({
    input,
    output,
    total,
  });
}
