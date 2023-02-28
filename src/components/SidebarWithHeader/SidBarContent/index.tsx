import {
  Box,
  BoxProps,
  CloseButton,
  Divider,
  DrawerBody,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { NavItem } from "../components/NavItem";
import logoImage from "../../../assets/logo.png";
import { routers } from "@/routes/routes";
import { useRouter } from "next/router";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter();
  return (
    <Box
      transition="1s ease"
      bg={"gray.700"}
      borderRadius={"lg"}
      w={{ base: "full", md: 72 }}
      pos="fixed"
      p="4"
      gap={2}
      flexDirection="column"
      {...rest}
    >
      <Flex h="14" alignItems="center" mx="8" justifyContent="space-between">
        <Stack w="36" align={"center"}>
          <Image src={logoImage} alt="logo" />
        </Stack>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box
        mb={"2"}
        bg="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)"
        height={"1px"}
      ></Box>

      {routers.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
