import { RegisterCard } from "@/components/RegisterCard/RegisterCard";
import { useLoading } from "@/hooks/useLoading/useLoading";
import { api } from "@/lib/axios";

import {
  Card,
  Flex,
  Grid,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUser, FaUserMd } from "react-icons/fa";

interface IDataClient {
  name: string;
  phone: string;
}

interface IResponseClient {
  data: IDataClient[];
}
export default function Register() {
  const router = useRouter();
  const { showLoading, closedLoading } = useLoading();
  const [paramsClient, setParamsClient] = useState({
    perPage: 10,
    page: 1,
  });
  useEffect(() => {
    closedLoading();
  }, []);

  const { data: dataClient, isLoading } = useQuery<IResponseClient>(
    ["dataTableAdmin", paramsClient.page, paramsClient.perPage],
    async () => {
      const params = {
        per_page: paramsClient.perPage,
        page: paramsClient.page,
      };
      const response = await api.get(`/admin/client/get-clients`, { params });
      return response.data;
    }
  );
  const columnsClients = [
    {
      label: "Nome",
    },
    {
      label: "Telefone",
    },
  ];
  const clients = dataClient?.data ? dataClient.data : [];

  return (
    <>
      <NextSeo title="Cadastros | Clinifisio" noindex />
      <Stack spacing={4}>
        <Flex justify={"flex-end"}></Flex>
        <Grid
          gap={"2"}
          templateColumns={{
            lg: "repeat(4, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          <RegisterCard
            path="/admin/cadastro/cliente"
            label="Cadastro de cliente"
            description="Cadastro de novos clientes"
            icon={<FaUser size={"3em"} />}
          />
          <RegisterCard
            path="/admin/cadastro/cliente"
            label="Cadastro de atendente"
            description="Cadastro de medicos, fisioterapeltas e nutricionistas"
            icon={<FaUserMd size={"3em"} />}
          />
        </Grid>
        <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}>
          <Card>
            <Flex align="center" justify="flex-start" p="4">
              <Text fontSize="lg" fontWeight="bold">
                Clientes
              </Text>
            </Flex>
            <Table>
              <Thead>
                <Tr>
                  {columnsClients.map((column) => (
                    <Th
                      key={column.label}
                      color="gray.400"
                      borderColor={"gray.600"}
                    >
                      {column.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody overflowY={"hidden"}>
                {clients?.map((el, index, arr) => {
                  return (
                    <>
                      <Tr key={index}>
                        <Td
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
                          {/* <Link href={`/admin/financeiro/${el.id}`} prefetch> */}
                          {el.name}
                          {/* </Link> */}
                        </Td>
                        <Td
                          fontSize="sm"
                          {...(index === arr.length - 1 && {
                            border: "none",
                          })}
                          borderColor={"gray.600"}
                        >
                          {el.phone}
                        </Td>
                      </Tr>
                    </>
                  );
                })}
              </Tbody>
            </Table>
          </Card>
        </Grid>
      </Stack>
    </>
  );
}
