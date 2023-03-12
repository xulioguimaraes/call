import { useLoading } from "@/hooks/useLoading/useLoading";

import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { Copy } from "phosphor-react";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import logoImage from "../../../assets/logo.png";
export default function Register() {
  const router = useRouter();
  const toast = useToast();
  const [copyClipboard, setCopyClipboard] = useState(false);
  const { showLoading, closedLoading } = useLoading();

  useEffect(() => {
    closedLoading();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("http://localhost:3000/register?doctor=true");
    setCopyClipboard(true);
    toast({
      duration: 5000,
      status: "success",
      title: "Link copiado",
    });
  };

  return (
    <>
      <NextSeo title="Cadastros atendente | Clinifisio" noindex />
      <Stack spacing={4}>
        <Card p={4}>
          <Flex justify={"space-between"} align="center">
            <Heading>Cadastro de atendente</Heading>
            <Image width={200} src={logoImage} alt="logo" />
          </Flex>
          <Box
            maxW={"xl"}
            border="1px"
            p="4"
            borderColor={"gray.600"}
            borderRadius={"lg"}
            gap="4"
            display={"grid"}
          >
            <Text>
              Para o cadastro de medicos, terapeutas ou nutricionistas se faz
              necessario uma conta Google.
            </Text>
            <Text>
              Copiei o link abaixo envie para o mesmo preencher suas informações
              basicas e seu horario de atendimento.
            </Text>
            <Flex
              p="2"
              borderRadius={"lg"}
              border="1px"
              justify={"space-between"}
              borderColor={"gray.600"}
              align="center"
            >
              <Link>http://localhost:3000/register</Link>
              <Button
                {...(copyClipboard && { colorScheme: "green" })}
                onClick={() => handleCopy()}
                leftIcon={copyClipboard ? <MdDone /> : <Copy />}
              >
                <Text>Copiar</Text>
              </Button>
            </Flex>
          </Box>
          <Flex pt="4" justify={"flex-end"}>
            <Button variant={"outline"} onClick={() => router.back()}>
              Voltar
            </Button>
          </Flex>
        </Card>
      </Stack>
    </>
  );
}
