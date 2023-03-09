import { useLoading } from "@/hooks/useLoading/useLoading";
import { prisma } from "@/lib/prisma";
import { buildNextAuthOption } from "@/pages/api/auth/[...nextauth].api";
import { Box, Button, Card, Flex, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { NextSeo } from "next-seo";
import { Trash } from "phosphor-react";
import { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
interface TransactionInfoProps {
  data: string;
  namePage: string;
}
export default function TransactionInfo(props: TransactionInfoProps) {
  const data = JSON.parse(props.data);

  const { closedLoading } = useLoading();
  useEffect(() => {
    closedLoading();
  }, []);
  return (
    <>
      <NextSeo title={`${props.namePage} | Clinifisio`} noindex />

      <Card padding={4}>
        <Box
          alignItems={"center"}
          w={"full"}
          display={"flex"}
          justifyContent="space-between"
          pb={4}
        >
          <Heading as="h2" size={"md"}>
            {props.namePage}
          </Heading>

          <Flex gap={4}>
            <Button
              leftIcon={<BiEdit />}
              variant={"solid"}
              colorScheme="whatsapp"
            >
              Editar
            </Button>
            <Button leftIcon={<Trash />} variant={"solid"} colorScheme="red">
              Excluir
            </Button>
          </Flex>
        </Box>
        {Object.keys(data).map((key) => {
          if (key === "typeTransaction")
            return <Text key={key}>{data[key].name}</Text>;
          return <Text key={key}>{data[key]}</Text>;
        })}

        <Flex justify={"flex-end"}>
          <Button variant={"outline"}>Voltar</Button>
        </Flex>
      </Card>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOption(req, res)
  );
  const expires = dayjs(session?.expires).isBefore(new Date());
  if (expires || !session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const transation = await prisma.transation.findFirst({
    where: {
      id: String(params?.id),
    },
    include: {
      typeTransaction: {
        select: {
          name: true,
        },
      },
    },
  });
  const namePage = transation?.title;
  return {
    props: {
      session,
      data: JSON.stringify(transation),
      namePage,
    },
  };
};
