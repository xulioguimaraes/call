import { Pagination } from "@/components/Pagination/Pagination";
import { StatusCard } from "@/components/StatusCard";
import { useLoading } from "@/hooks/useLoading/useLoading";
import { api } from "@/lib/axios";

import { TableTransaction } from "@/views/Admin/components/TableTransaction/TableTransaction";
import { Box, Button, Card, Flex, Grid, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
interface IDataTransaction {
  data: Array<{
    title: string;
    price: number;
    description: string;
    doctor?: string;
    created_at: string;
    type: boolean;
  }>;
  total: number;
  page: number;
  perPage: number;
}
interface IStatus {
  value: string;
  date_last_trasnsation?: Date;
  percentage: number;
}

interface ISummary {
  input: IStatus;
  output: IStatus;
  total: IStatus;
}
export default function Financial() {
  const router = useRouter();
  const { showLoading, closedLoading } = useLoading();
  const [params, setParams] = useState({
    perPage: 10,
    page: 1,
  });
  const handleEntry = async () => {
    showLoading();
    await router.push("/admin/financeiro/cadastrar");
    closedLoading();
  };

  const { data, isLoading } = useQuery<IDataTransaction>(
    ["dataTableAdmin", params.page, params.perPage],
    async () => {
      const response = await api.get(`/admin/get-transaction`, {
        params,
      });
      return response.data;
    }
  );

  const { data: summary } = useQuery<ISummary>(
    ["summaryTransaction"],
    async () => {
      const response = await api.get(`/admin/get-summary-of-the-month`);
      return response.data;
    },
    {}
  );
  const totalPages = data?.total ? data.total : 0;

  const handlePageTable = (page: number) => {
    setParams((oldValue) => ({ ...oldValue, page }));
  };

  useEffect(() => {
    if (isLoading) showLoading();
    else closedLoading();
  }, [isLoading]);
  useEffect(() => {
    console.log(params);
  }, [params]);

  return (
    <>
      <NextSeo title="Financeiro | Clinifisio" noindex />
      <Stack spacing={4}>
        <Flex justify={"flex-end"}>
          <Button
            onClick={handleEntry}
            leftIcon={<GrAdd />}
            colorScheme={"green"}
          >
            Entrada
          </Button>
        </Flex>
        <Grid gap={"2"} templateColumns={"repeat(3, 1fr)"}>
          <StatusCard
            title={"Entradas"}
            stat={summary?.input?.value || ""}
            icon={<BiDollarCircle size={"3em"} />}
            dateLastTrasnsation={summary?.input?.date_last_trasnsation}
            percentage={summary?.input?.percentage}
          />
          <StatusCard
            title={"Saidas"}
            stat={summary?.output?.value || ""}
            icon={<BiDollarCircle size={"3em"} />}
            dateLastTrasnsation={summary?.input?.date_last_trasnsation}
            percentage={summary?.output?.percentage}
          />
          <StatusCard
            title={"TOTAL"}
            percentage={summary?.total?.percentage}
            stat={summary?.total?.value || ""}
            icon={<BiDollarCircle size={"3em"} />}
            positiveBalance={Number(summary?.total?.percentage) > 0}
          />
        </Grid>
        {data?.data?.length && <TableTransaction data={data.data} />}
        <Pagination
          page={params.page}
          total={totalPages}
          perPage={params.perPage}
          onChange={handlePageTable}
        />
      </Stack>
    </>
  );
}
