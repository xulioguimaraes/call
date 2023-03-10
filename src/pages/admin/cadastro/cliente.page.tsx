import { useLoading } from "@/hooks/useLoading/useLoading";
import { api } from "@/lib/axios";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { MdClear } from "react-icons/md";
import InputMask from "react-input-mask";

import { z } from "zod";
const formSchema = z.object({
  name: z.string().min(3),
  cpf: z
    .string()
    .min(14)
    .transform((value) => value?.replace(/[^0-9]/g, "")),
  dateBirth: z
    .string()
    .min(10)
    .refine((value) => dayjs().isAfter(dayjs(value)))
    .transform((value) => {
      return dayjs(value).toISOString();
    }),
  phone: z.string().min(15),
  observation: z.string().optional(),
});

type FormDataInput = z.input<typeof formSchema>;
type FormDataOutput = z.output<typeof formSchema>;

export default function RegisterClient() {
  const router = useRouter();
  const toast = useToast();
  const { showLoading, closedLoading } = useLoading();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormDataInput>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    closedLoading();
  }, []);
  const handleSave = async (data: any) => {
    const { cpf, dateBirth, name, phone, observation } = data as FormDataOutput;
    showLoading();
    await api
      .post("/admin/client/create", {
        cpf,
        date_of_birth: dateBirth,
        name,
        phone,
        observation,
      })
      .then(async (response) => {
        if (response.status === 201) {
          toast({
            title: "Cliente Cadastrado",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
        await router.back();
        closedLoading();
      })
      .catch((errors) => {
        const description = errors.response.data?.message
          ? errors.response.data?.message
          : "Verifique as informações e tente novamente";
        toast({
          title: "Erro ao criar cliente",
          description,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setError("cpf", {
          message: "Cpf já cadastrado",
        });
      });

    closedLoading();
  };
  const handleYes = () => router.back();
  const handleClear = () => reset();

  return (
    <>
      <NextSeo title="Cadastar cliente | Clinifisio" noindex />
      <Card padding={4}>
        <Flex justify={"space-between"} align="center">
          <Heading as="h2" size={"md"} mb="2">
            Cadastar cliente
          </Heading>
          <Button
            onClick={handleClear}
            leftIcon={<MdClear />}
            variant="outline"
          >
            Limpar
          </Button>
        </Flex>
        <Stack spacing={2} as="form" onSubmit={handleSubmit(handleSave)}>
          <FormControl isInvalid={!!errors?.name}>
            <FormLabel mb={0} fontWeight={"bold"} fontSize="sm">
              Nome
            </FormLabel>
            <Input
              {...register("name", { required: true })}
              type="text"
              name="name"
              placeholder="Nome completo"
            />
          </FormControl>
          <SimpleGrid columns={[2, null, 3]} gap={4}>
            <FormControl isInvalid={!!errors?.cpf}>
              <FormLabel mb={0} fontWeight={"bold"} fontSize="sm">
                CPF
              </FormLabel>
              <Input
                as={InputMask}
                mask="999.999.999-99"
                maskChar={null}
                {...register("cpf", { required: true })}
                name="cpf"
                placeholder="Insira o CPF"
              />
            </FormControl>
            <FormControl isInvalid={!!errors?.phone}>
              <FormLabel mb={0} fontWeight={"bold"} fontSize="sm">
                Telefone
              </FormLabel>
              <Input
                {...register("phone", { required: true })}
                as={InputMask}
                mask="(99) 99999-9999"
                maskChar={null}
                name="phone"
                placeholder="Numero do telefone"
              />
            </FormControl>
            <FormControl isInvalid={!!errors?.dateBirth}>
              <FormLabel mb={0} fontWeight={"bold"} fontSize="sm">
                Data de nascimento
              </FormLabel>
              <Input
                {...register("dateBirth", { required: true })}
                name="dateBirth"
                type={"date"}
                placeholder="Data de nascimento"
              />
            </FormControl>
          </SimpleGrid>
          <FormControl>
            <FormLabel mb={0} fontWeight={"bold"} fontSize="sm">
              Observação
            </FormLabel>

            <Textarea
              {...register("observation")}
              name="observation"
              placeholder="Observações sobre o cliente..."
            />
          </FormControl>
          <Flex justify={"flex-end"} gap={4} pt="4">
            <Button onClick={onOpen} type="button" variant={"outline"}>
              Voltar
            </Button>
            <Button type="submit" colorScheme={"whatsapp"}>
              Salvar
            </Button>
          </Flex>
        </Stack>
      </Card>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Descartar informações?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Você esta preste a descartar todas as informações inseridas sobre o
            cliente. Tem certeza?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Não
            </Button>
            <Button onClick={handleYes} colorScheme="red" ml={3}>
              Sim
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
