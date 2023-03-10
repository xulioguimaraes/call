import { RegisterCard } from "@/components/RegisterCard/RegisterCard";
import { useLoading } from "@/hooks/useLoading/useLoading";

import { Flex, Grid, Stack } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUser, FaUserMd } from "react-icons/fa";

interface IStatus {
  value: string;
  date_last_trasnsation?: Date;
  percentage: number;
}

export default function Register() {
  const router = useRouter();
  const { showLoading, closedLoading } = useLoading();
  const [params, setParams] = useState({
    perPage: 10,
    page: 1,
  });
  useEffect(() => {
    closedLoading();
  }, []);

  //   const { data, isLoading } = useQuery<IDataTransaction>(
  //     ["dataTableAdmin", params.page, params.perPage],
  //     async () => {
  //       const response = await api.get(`/admin/transaction/get-transaction`, {
  //         params,
  //       });
  //       return response.data;
  //     }
  //   );

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
      </Stack>
    </>
  );
}
