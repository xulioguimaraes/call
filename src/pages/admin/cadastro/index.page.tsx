import { RegisterCard } from "@/components/RegisterCard/RegisterCard";
import { useLoading } from "@/hooks/useLoading/useLoading";
import { TableListAttendant } from "@/views/Client/components/TableListAttendant/TableListAttendant";
import { TableListClient } from "@/views/Client/components/TableListClient/TableListClient";

import { Box, Flex, Grid, SimpleGrid, Stack } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUser, FaUserMd } from "react-icons/fa";

export default function Register() {
  const router = useRouter();

  return (
    <>
      <NextSeo title="Cadastros | Clinifisio" noindex />
      <Stack as={"main"} spacing={4}>
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
            path="/admin/cadastro/atendente"
            label="Cadastro de atendente"
            description="Cadastro de medicos, fisioterapeltas e nutricionistas"
            icon={<FaUserMd size={"3em"} />}
          />
        </Grid>
        <SimpleGrid gap="2" columns={[2, null, 2]}>
          <TableListClient />
          <TableListAttendant />
        </SimpleGrid>
      </Stack>
    </>
  );
}
