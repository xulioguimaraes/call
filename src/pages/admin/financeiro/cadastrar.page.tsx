import { Loading } from "@/components/Loading/Loading";
import { api } from "@/lib/axios";
import {
  Container,
  Heading,
  Input,
  Stack,
  Textarea,
  Button,
  Radio,
  RadioGroup,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { z } from "zod";
const formSchema = z.object({
  title: z.string().min(3),
  price: z
    .string()
    .transform((value) => Number(value?.replace(/[^0-9]/g, "")) * 100)
    .refine((price) => price > 0, {
      message: "O preço deve ser maior que zero",
    }),
  description: z.string().optional(),
  type: z.string().transform((value) => (value === "1" ? true : false)),
  type_transation: z
    .string()
    .refine((value) => (value === "" || value === "0" ? false : true), {
      message: "Selecione o tipo da entrada",
    })
    .transform((value) => Number(value?.replace(/[^0-9]/g, ""))),
});
type FormDataInput = z.input<typeof formSchema>;
type FormDataOutput = z.output<typeof formSchema>;

export default function Financial() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormDataInput>({
    resolver: zodResolver(formSchema),
  });
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const { description, price, title, type, type_transation } =
      data as FormDataOutput;
    const response = await api.post("/admin/create-transaction", {
      description,
      price,
      title,
      type,
      type_transation,
    });

    if (response.status === 201) {
      toast({
        title: "Transação criada",
        description: "Para mais informações vá em Transferencias",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Erro ao criar transação",
        description: "Verifique as informações e tente novamente",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    await router.push("/admin/financeiro");
    setIsLoading(false);
  };
  const valuePrice = watch("price") ? watch("price") : "";
  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(String(valuePrice)?.replace(/[^0-9]/g, "")) / 100);

  return (
    <>
      <NextSeo title="Cadastrar | Clinifisio" noindex />

      {isLoading && <Loading />}
      <Stack
        px={4}
        py={6}
        borderRadius="lg"
        shadow={"lg"}
        as={Container}
        bg={"gray.700"}
      >
        <Stack as={"form"} spacing={3} onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h2" size={"md"}>
            Cadastar Transação
          </Heading>
          <FormControl isInvalid={!!errors?.title}>
            <FormLabel mb={0} fontWeight={"bold"} fontSize="sm">
              Titulo
            </FormLabel>
            <Input
              {...register("title", { required: true })}
              type="text"
              name="title"
              placeholder="Titulo"
            />
          </FormControl>
          <FormControl isInvalid={!!errors?.price}>
            <FormLabel mb={0} fontWeight={"bold"} fontSize="sm">
              Preço
            </FormLabel>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={"0"}
              name="price"
              render={({ field }) => (
                <Input
                  {...field}
                  name="price"
                  value={price}
                  placeholder="Valor"
                />
              )}
            />
            <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.type}>
            <Controller
              name="type"
              control={control}
              defaultValue={"1"}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction="row">
                    <Radio value="1">Entrada</Radio>
                    <Radio value="0">Saida</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.type_transation}>
            <FormLabel mb={0} fontWeight={"bold"} fontSize="sm">
              Forma de transferencia
            </FormLabel>
            <Select
              {...register("type_transation", { required: true })}
              placeholder="Tipo de entrada"
            >
              <option value="1">Credito</option>
              <option value="2">Debito</option>
              <option value="3">PIX</option>
              <option value="4">Dinheiro</option>
            </Select>
            <FormErrorMessage>
              {errors.type_transation?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel mb={0} fontWeight={"bold"} fontSize="sm">
              Descrição
            </FormLabel>

            <Textarea
              {...register("description")}
              name="description"
              placeholder="Descrição"
            />
          </FormControl>

          <Button
            leftIcon={isSubmitting || isLoading ? <Spinner /> : <></>}
            colorScheme={"whatsapp"}
            type="submit"
            disabled={isSubmitting}
          >
            Cadastrar
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
