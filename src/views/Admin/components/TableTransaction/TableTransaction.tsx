import { useLoading } from "@/hooks/useLoading/useLoading";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  Collapse,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";

const createTransactionSchema = z.object({
  title: z.string(),
  price: z.number().transform((price) =>
    Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price / 10000)
  ),
  description: z.string(),
  type: z.boolean(),
  type_transation: z.number(),
  created_at: z.string().transform((date) => dayjs(date).format("DD/MM/YYYY")),
});
interface IDataTransaction {
  id?: string;
  title: string;
  price: number;
  description: string;
  doctor?: string;
  created_at: string;
  type: boolean;
}

interface TableTransactionProps {
  data: IDataTransaction[];
}

export const TableTransaction = ({ data }: TableTransactionProps) => {
  const [rowData, setRowData] = useState({} as IDataTransaction);
  const { showLoading, closedLoading } = useLoading();
  const router = useRouter();
  const handleExpandedRow = async (row: IDataTransaction) => {
    showLoading();

  };
  return (
    <>
      <Card p="0px" maxW={"100%"}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" fontWeight="bold">
              Ultimas transações
            </Text>
            <Button variant="primary" maxH="30px">
              {/* <Link>Ver todas</Link> */}
            </Button>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <Table>
              <Thead>
                <Tr>
                  <Th color="gray.400" borderColor={"gray.600"}>
                    Titulo
                  </Th>
                  <Th color="gray.400" borderColor={"gray.600"}>
                    Medico
                  </Th>
                  <Th color="gray.400" borderColor={"gray.600"}>
                    Valor
                  </Th>
                  <Th color="gray.400" borderColor={"gray.600"}>
                    Descrição
                  </Th>
                  <Th color="gray.400" borderColor={"gray.600"}>
                    Data
                  </Th>
                </Tr>
              </Thead>
              <Tbody overflowY={"hidden"}>
                {data?.map((el, index, arr) => {
                  const { created_at, description, price, title, type } =
                    createTransactionSchema.parse(el);
                  const colorTypeTransation = type ? "green.400" : "red.400";
                  return (
                    <>
                      <Tr key={index}>
                        <Td
                          onClick={() => handleExpandedRow(el)}
                          fontSize="sm"
                          fontWeight="bold"
                          borderColor={"gray.600"}
                          cursor="pointer"
                          _hover={{
                            textDecoration: "underline",
                          }}
                          {...(index === arr.length - 1 && {
                            border: "none",
                          })}
                        >
                          <Link href={`/admin/financeiro/${el.id}`} prefetch>
                            {title}
                          </Link>
                        </Td>
                        <Td
                          fontSize="sm"
                          {...(index === arr.length - 1 && {
                            border: "none",
                          })}
                          borderColor={"gray.600"}
                        >
                          {/* {doctor} */}
                        </Td>
                        <Td
                          fontSize="sm"
                          {...(index === arr.length - 1 && {
                            border: "none",
                          })}
                          borderColor={"gray.600"}
                        >
                          <Text
                            as="span"
                            color={colorTypeTransation}
                            fontWeight="bold"
                          >
                            {price}
                          </Text>
                        </Td>
                        <Td
                          fontSize="sm"
                          {...(index === arr.length - 1 && {
                            border: "none",
                          })}
                          borderColor={"gray.600"}
                        >
                          {description}
                        </Td>
                        <Td
                          fontSize="sm"
                          {...(index === arr.length - 1 && {
                            border: "none",
                          })}
                          borderColor={"gray.600"}
                        >
                          {created_at}
                        </Td>
                      </Tr>
                    </>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Card>
    </>
  );
};
