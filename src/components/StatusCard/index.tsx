import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
export function StatusCard(props: StatusCardProps) {
  const { title, stat, icon } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      bg="gray.700"
      rounded={"lg"}
    >
      <Flex direction="column">
        <Flex
          flexDirection="row"
          align="center"
          justify="center"
          w="100%"
          mb="25px"
        >
          <Stat me="auto">
            <StatLabel
              fontSize="xs"
              color="gray.400"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
               {stat}
              </StatNumber>
            </Flex>
          </Stat>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
        <Text color="gray.400" fontSize="sm">
          <Text as="span" color="green.400" fontWeight="bold">
            +3.48%{" "}
          </Text>
          Desde o último mês
        </Text>
      </Flex>
    </Stat>
  );
}
