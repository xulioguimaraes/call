import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { ChartLine } from "../ChartLine/ChartLine";

export const SalesOverviews = () => {
  return (
    <>
      <Card
        bg={"linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"}
        p="0px"
        maxW={"100%"}
      >
        <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
          <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
            Visão geral de vendas
          </Text>
          <Text color="#fff" fontSize="sm">
            <Text as="span" color="green.400" fontWeight="bold">
              (+5) more{" "}
            </Text>
            in 2022
          </Text>
        </Flex>
        <Box minH="300px">
          <ChartLine />
        </Box>
      </Card>
    </>
  );
};
