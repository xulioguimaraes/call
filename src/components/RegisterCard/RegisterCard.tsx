import { useLoading } from "@/hooks/useLoading/useLoading";
import { Box, Card, Flex, Link, Stat, StatLabel, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";

interface RegisterCardProps {
  label: string;
  description: string;
  icon: ReactNode;
  path: string;
}

export const RegisterCard = ({
  description,
  icon,
  label,
  path,
}: RegisterCardProps) => {
  const router = useRouter();
  const { showLoading } = useLoading();
  const handleCard = async () => {
    await router.push(path);
  };
  return (
    <>
      <Card
        cursor="pointer"
        _hover={{
          background: "gray.800",
          transition: "1s ease",
        }}
        onClick={handleCard}
      >
        <Flex
          px={{ base: 2, md: 4 }}
          py={"5"}
          alignItems="center"
          justifyContent={"center"}
          height="100%"
        >
          <Stat me="auto">
            <StatLabel
              fontSize="md"
              color="gray.400"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {label}
            </StatLabel>
            <Text fontSize={"sm"} color={"gray.500"}>
              {description}
            </Text>
          </Stat>
          <Box my={"auto"} color={"gray.200"} alignContent={"center"}>
            {icon}
          </Box>
        </Flex>
      </Card>
    </>
  );
};
