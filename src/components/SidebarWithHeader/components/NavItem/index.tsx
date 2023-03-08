import { useLoading } from "@/hooks/useLoading/useLoading";
import {
  Flex,
  FlexProps,
  Link,
  Icon,
  Button,
  Text,
  ButtonProps,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface NavItemProps extends ButtonProps {
  icon: IconType;
  children: ReactNode;
  path: string;
}
export const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  const router = useRouter();
  const asPath = router.asPath;
  const { showLoading, closedLoading } = useLoading();
  const handlePath = async (toPath: string) => {
    showLoading();
    const p = toPath === "/admin" ? "/" : toPath;
    await router.push(`/admin${p}`);
    closedLoading();
  };

  return (
    <Link
      // href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Button
        {...rest}
        role="group"
        width={"full"}
        display="flex"
        size={"md"}
        type="button"
        colorScheme="gray"
        borderRadius="full"
        alignItems={"center"}
        onClick={() => handlePath(path)}
        justifyContent={"flex-start"}
        variant={asPath === path ? "solid" : "ghost"}
        {...(asPath === path && { shadow: "md" })}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text
          as={"span"}
          fontSize={"sm"}
          textAlign="center"
          fontWeight={"bold"}
        >
          {children}
        </Text>
      </Button>
    </Link>
  );
};
