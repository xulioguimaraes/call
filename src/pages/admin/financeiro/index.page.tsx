import { StatusCard } from "@/components/StatusCard";
import { PageVisits } from "@/views/Admin/components/PageVisits/PageVisits";
import { Button, Flex, Grid, Stack } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { BiDollarCircle } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";

export default function Financial() {
  const router = useRouter();
  const handleEntry = async () => {
    await router.push("/admin/financeiro/cadastrar");
  };
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
            stat={"R$ 1002,89"}
            icon={<BiDollarCircle size={"3em"} />}
          />
          <StatusCard
            title={"Saidas"}
            stat={"R$ 1002,89"}
            icon={<BiDollarCircle size={"3em"} />}
          />
          <StatusCard
            title={"TOTAL"}
            stat={"R$ 1002,89"}
            icon={<BiDollarCircle size={"3em"} />}
          />
        </Grid>
        <PageVisits />
      </Stack>
    </>
  );
}
