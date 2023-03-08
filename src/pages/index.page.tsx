import { NextSeo } from "next-seo";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import Image from "next/image";
import logoImage from "../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLoading } from "@/hooks/useLoading/useLoading";

const emailLoginSchema = z.object({
  email: z.string().email({ message: "Insira um email valido" }),
});

type EmailLoginData = z.infer<typeof emailLoginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailLoginData>({
    resolver: zodResolver(emailLoginSchema),
  });
  const session = useSession();
  const { showLoading, closedLoading } = useLoading();
  const router = useRouter();
  const authenticated = async () => {
    const isSignedIn = session.status === "authenticated";

    if (isSignedIn) {
      await router.push("/admin");
    }
    closedLoading();
  };
  useEffect(() => {
    showLoading();
    authenticated();
  }, [session]);
  const onSubmit = async (data: EmailLoginData) => {
    showLoading();
    const response = await api.get("/users/user-exists", {
      params: {
        email: data.email,
      },
    });
    if (response.status === 200) {
      await signIn("google");
    }
    closedLoading();
  };
  return (
    <>
      <NextSeo title="Login | Clinifisio" noindex />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          as={"form"}
          onSubmit={handleSubmit(onSubmit)}
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
        >
          <Stack align={"center"}>
            <Image src={logoImage} alt="logo" />
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  {...register("email")}
                  placeholder="johndoe@example.com"
                  size={"lg"}
                  type="email"
                />
              </FormControl>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  leftIcon={<FcGoogle />}
                  size={"lg"}
                  bg={"#d0b566"}
                  color={"white"}
                  _hover={{
                    bg: "#d0b56652",
                  }}
                >
                  Login com o Google
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
