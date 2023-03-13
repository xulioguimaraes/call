/* eslint-disable react/no-children-prop */
import { useLoading } from "@/hooks/useLoading/useLoading";
import { api } from "@/lib/axios";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiStep } from "@ignite-ui/react";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Form, FormError, Header } from "./styles";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "O usuário precisa ter pelo menos 3 letras.",
    })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O v pode ter apenas letras e hifens",
    })
    .transform((value) => value.toLowerCase()),
  name: z.string().min(3, {
    message: "O nome precisa ter pelo menos 3 letras.",
  }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });
  const router = useRouter();

  const { closedLoading } = useLoading();
  const doctor = router.query?.doctor ? router.query.doctor : undefined;
  const toast = useToast();
  useEffect(() => {
    closedLoading();
  }, []);

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await api.post("/users", {
        name: data.name,
        username: data.username,
      });
      await router.push(`/register/connect-calendar`);
      signOut();
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data.message) {
        toast({
          title: err.response.data.message,
          duration: 5000,
          status: "error",
        });
        setError("username", {
          message: err.response.data.message,
        });
        return;
      }
      console.log(err);
    }
  };
  return (
    <>
      <NextSeo title="Crie uma conta | Call" />
      <Container>
        <Header>
          <Heading size={"lg"} lineHeight={"base"} as="strong" py={2}>
            Bem-vindo a Clinifisio
          </Heading>
          <Text color={"gray.300"} py="2">
            Precisamos de algumas informações para criar seu perfil!, Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size={"sm"}></Text>

            <FormControl isInvalid={!!errors?.username?.message}>
              <FormLabel mb={0}>Nome de usuário</FormLabel>
              <InputGroup>
                <InputLeftAddon children="ignite.com/" />
                <Input
                  isDisabled={isSubmitting}
                  placeholder="seu-usuario"
                  {...register("username")}
                />
              </InputGroup>
            </FormControl>

            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>
          <label>
            <FormControl isInvalid={!!errors?.name?.message}>
              <FormLabel mb={0}>Nome de usuário</FormLabel>
              <Input
                isDisabled={isSubmitting}
                placeholder="Seu nome"
                {...register("name")}
              />
            </FormControl>
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <Button
            rightIcon={<ArrowRight />}
            colorScheme={"green"}
            type="submit"
            isLoading={isSubmitting}
          >
            Próximo passo
          </Button>
        </Form>
      </Container>
    </>
  );
}
