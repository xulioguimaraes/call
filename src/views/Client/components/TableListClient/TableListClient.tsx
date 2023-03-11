import { Pagination } from "@/components/Pagination/Pagination";
import { useLoading } from "@/hooks/useLoading/useLoading";
import { api } from "@/lib/axios";
import {
  Box,
  Card,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
interface IDataClient {
  name: string;
  phone: string;
}

interface IResponseClient {
  data: IDataClient[];
  total: number;
}
export const TableListClient = () => {
  const { showLoading, closedLoading } = useLoading();

  const [paramsClient, setParamsClient] = useState({
    perPage: 10,
    page: 1,
  });
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

  const totalPages = dataClient?.total ? dataClient.total : 0;

  const handlePageTable = (page: number) => {
    setParamsClient((oldValue) => ({ ...oldValue, page }));
  };
  const handlePerPage = (perPage: number) => {
    setParamsClient((oldValue) => ({ ...oldValue, perPage }));
  };
  useEffect(() => {
    if (isLoading) showLoading();
    else closedLoading();
  }, [isLoading]);

  return (
    <>
      <Box>
        <Card mb={2}>
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
        <Pagination
          page={paramsClient.page}
          total={totalPages}
          perPage={paramsClient.perPage}
          onChange={handlePageTable}
          onChangePerPage={handlePerPage}
        />
      </Box>
    </>
  );
};
