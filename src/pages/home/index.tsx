import { NextSeo } from "next-seo";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import Image from "next/image";
import logoImage from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// const debouncedChangeHandler = debounce(changeHandler, 300)
const emailLoginSchema = z.object({
  email: z.string().email({ message: "Insira um email valido" }),
});

type UpdateProfileData = z.infer<typeof emailLoginSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(emailLoginSchema),
  });
  const onSubmit = () => {
    console.log("onSubmit");
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
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
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
