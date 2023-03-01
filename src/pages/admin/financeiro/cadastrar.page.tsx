import {
  Icon,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Stack,
  Textarea,
  Button,
  Box,
  Radio,
  RadioGroup,
  Select,
  FormControl,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
const formSchema = z.object({
  title: z.string().min(3),
  price: z.string(),
  description: z.string(),
  type: z.string(),
  typeEntry: z.string(),
});

type FormData = z.infer<typeof formSchema>;
export default function Financial() {
  const { register, handleSubmit, control, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
    },
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const valuePrice = watch("price") ? watch("price") : "";
  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(valuePrice?.replace(/[^0-9]/g, "")) / 100);

  return (
    <>
      <NextSeo title="Cadastrar | Clinifisio" noindex />

      <Stack
        px={4}
        py={6}
        borderRadius="lg"
        shadow={"lg"}
        as={Container}
        bg={"gray.700"}
      >
        <Stack as={FormControl} spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h2" size={"md"}>
            Cadastar Transação
          </Heading>

          <Input
            {...register("title")}
            type="text"
            name="title"
            placeholder="Titulo"
          />
          <Controller
            control={control}
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

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup defaultValue="1" {...field}>
                <Stack direction="row">
                  <Radio value="1">Entrada</Radio>
                  <Radio value="2">Saida</Radio>
                </Stack>
              </RadioGroup>
            )}
          />

          <Select {...register("typeEntry")} placeholder="Tipo de entrada">
            <option value="1">Credito</option>
            <option value="2">Debito</option>
            <option value="3">PIX</option>
            <option value="4">Dinheiro</option>
          </Select>
          <Textarea
            {...register("description")}
            name="description"
            placeholder="Descrição"
          />

          <Button colorScheme={"whatsapp"} type="submit">
            Cadastrar
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
