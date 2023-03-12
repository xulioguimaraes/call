import { Pagination } from "@/components/Pagination/Pagination";
import { useLoading } from "@/hooks/useLoading/useLoading";
import { api } from "@/lib/axios";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CardTable, ContainerTable } from "../../styles/styles";

interface IDataAttendant {
  name: string;
  avatar_url: string;
}

interface IResponseAttendant {
  data: IDataAttendant[];
  total: number;
}
export const TableListAttendant = () => {
  const { showLoading, closedLoading } = useLoading();
  const toast = useToast();

  const [paramsAttendant, setParamsAttendant] = useState({
    perPage: 10,
    page: 1,
  });
  const {
    data: dataAttendant,
    isLoading,
    error,
  } = useQuery<IResponseAttendant>(
    ["dataTableAttendant", paramsAttendant.page, paramsAttendant.perPage],
    async () => {
      const params = {
        per_page: paramsAttendant.perPage,
        page: paramsAttendant.page,
      };
      const response = await api.get(`/admin/attendant/get-attendant`, {
        params,
      });
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );
  const columnsAttendant = [
    {
      label: "Nome",
    },
  ];
  const attendant = dataAttendant?.data ? dataAttendant.data : [];

  const totalPages = dataAttendant?.total ? dataAttendant.total : 0;

  const handlePageTable = (page: number) => {
    setParamsAttendant((oldValue) => ({ ...oldValue, page }));
  };
  const handlePerPage = (perPage: number) => {
    setParamsAttendant((oldValue) => ({ ...oldValue, perPage }));
  };
  useEffect(() => {
    if (isLoading) showLoading();
    else closedLoading();
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao obter informações",
        description:
          "Tente atualizar a pagina, se o problema pessistir contate o administrador",
        duration: 5000,
        status: "error",
      });
    }
  }, [error]);

  return (
    <>
      <ContainerTable>
        <CardTable>
          <Flex align="center" justify="flex-start" p="4">
            <Text fontSize="lg" fontWeight="bold">
              Atendentes
            </Text>
          </Flex>
          {isLoading ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <Table>
                <Thead>
                  <Tr>
                    {columnsAttendant.map((column) => (
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
                  {attendant?.map((el, index, arr) => {
                    return (
                      <>
                        <Tr key={index}>
                          <Td
                            fontSize="sm"
                            p={2}
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
                            <Flex align={"center"} gap="4">
                              <Flex align={"center"} justify="center">
                                <Avatar
                                  size="sm"
                                  name="Prosper Otemuyiwa"
                                  src={el.avatar_url}
                                />
                              </Flex>
                              {/* <Link href={`/admin/financeiro/${el.id}`} prefetch> */}
                              {el.name}
                              {/* </Link> */}
                            </Flex>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
              </Table>
              <Divider color={"gray.600"} mb="2" />
              <Pagination
                page={paramsAttendant.page}
                total={totalPages}
                perPage={paramsAttendant.perPage}
                onChange={handlePageTable}
                onChangePerPage={handlePerPage}
              />
            </>
          )}
        </CardTable>
      </ContainerTable>
    </>
  );
};
