import { Box, Card, Flex, Text, Tooltip } from "@chakra-ui/react";

import { ChartBar } from "../ChartBar/ChartBar";

export const Performance = () => {
 
  return (
    <>
      <Card
        p="0px"
        maxW={{ sm: "320px", md: "100%" }}
        bg={"linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"}
      >
        <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
          <Text color="gray.400" fontSize="sm" fontWeight="bold" mb="6px">
            PERFORMANCE
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Total orders
          </Text>
        </Flex>
        <Box minH="300px">
          <ChartBar />
        </Box>
      </Card>
    </>
  );
};
