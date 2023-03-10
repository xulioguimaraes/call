import { useLoading } from "@/hooks/useLoading/useLoading";
import { api } from "@/lib/axios";
import { prisma } from "@/lib/prisma";
import { buildNextAuthOption } from "@/pages/api/auth/[...nextauth].api";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Trash } from "phosphor-react";
import { LegacyRef, useEffect, useRef } from "react";
import { BiEdit } from "react-icons/bi";
interface TransactionInfoProps {
  data: string;
  namePage: string;
}
// interface ITransaction {
//   id: string;
//   name: string;
//   typeTransaction: {
//     name: string;
//   }
// }
export default function TransactionInfo(props: TransactionInfoProps) {
  const data = JSON.parse(props.data);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();
  const toast = useToast();
  const { closedLoading, showLoading } = useLoading();

  useEffect(() => {
    closedLoading();
  }, []);
  
  const handleBack = () => router.back();
  const handleDelete = async () => {
    showLoading();
    onClose();
    const response = await api.delete(`/admin/transaction/${data.id}`);
    if (response.status === 201) {
      toast({
        title: "Transação deletada",
        description: "Essa ação é permanente, não pode ser revertida",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Erro ao deletar transação",
        description: "Verifique as informações e tente novamente",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    await router.back();

    closedLoading();
  };
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
            <Button
              onClick={onOpen}
              leftIcon={<Trash />}
              variant={"solid"}
              colorScheme="red"
            >
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
          <Button onClick={handleBack} variant={"outline"}>
            Voltar
          </Button>
        </Flex>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        motionPreset="scale"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar transação?
            </AlertDialogHeader>

            <AlertDialogBody>
              Você esta tem certeza que deseja deletar essa transação?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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
