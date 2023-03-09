import {
  Box,
  Flex,
  Spinner,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
  positiveBalance?: boolean | undefined;
  percentage: number | undefined;
  dateLastTrasnsation?: Date;
}
export function StatusCard(props: StatusCardProps) {
  const {
    title,
    stat,
    icon,
    positiveBalance,
    percentage,
    dateLastTrasnsation,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorBg =
    positiveBalance === undefined
      ? "gray.700"
      : positiveBalance === true
      ? "green.700"
      : "red.800";
  const colorPercentage = Number(percentage) > 0 ? "green.400" : "red.400";
  const conditionPercentage = Number(percentage) > 0 ? true : false;
  const conditionLastTransaction = dateLastTrasnsation
    ? dayjs(dateLastTrasnsation).format("DD  [de] MMMM [de] YYYY")
    : false;
  
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      bg={colorBg}
      rounded={"lg"}
    >
      <Flex direction="column">
        <Flex
          flexDirection="row"
          align="center"
          justify="center"
          w="100%"
          mb={conditionLastTransaction ? "10px" : "25px"}
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
                {stat === "" ? <Spinner /> : stat}
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

        <Box>
          <Flex gap={2} alignItems="center">
            {!percentage ? (
              <Spinner />
            ) : (
              <>
                <Text as="span" color={colorPercentage} fontWeight="bold">
                  {percentage} %{" "}
                </Text>
                <Text color="gray.200" fontSize="sm">
                  {conditionPercentage ? "Maior" : "Menor"} que o último mês
                </Text>
              </>
            )}
          </Flex>
          {conditionLastTransaction && (
            <Text color="gray.400" fontSize="sm">
              {conditionLastTransaction}
            </Text>
          )}
        </Box>
      </Flex>
    </Stat>
  );
}
