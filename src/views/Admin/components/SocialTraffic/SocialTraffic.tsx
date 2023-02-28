import { Box, Button, Card, Flex, Progress, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

export const SocialTraffic = () => {
    const socialTraffic = [
        {
          referral: "Facebook",
          visitors: "1,480",
          percentage: 60,
          color: "orange",
        },
        {
          referral: "Facebook",
          visitors: "5,480",
          percentage: 70,
          color: "orange",
        },
        {
          referral: "Google",
          visitors: "4,807",
          percentage: 80,
          color: "cyan",
        },
        {
          referral: "Instagram",
          visitors: "3,678",
          percentage: 75,
          color: "cyan",
        },
        {
          referral: "Twitter",
          visitors: "2,645",
          percentage: 30,
          color: "orange",
        },
      ];
    
  return (
    <>
      <Card p="0px" maxW={"100%"}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg"  fontWeight="bold">
              Social traffic
            </Text>
            <Button variant="primary" maxH="30px">
              SEE ALL
            </Button>
          </Flex>
        </Flex>
        <Box overflow={{ sm: "scroll", lg: "hidden" }}>
          <Table>
            <Thead>
              <Tr >
                <Th color="gray.400" borderColor={"gray.600"}>
                  Referral
                </Th>
                <Th color="gray.400" borderColor={"gray.600"}>
                  Visitors
                </Th>
                <Th color="gray.400" borderColor={"gray.600"}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {socialTraffic.map((el, index, arr) => {
                return (
                  <Tr key={index}>
                    <Td
                      
                      fontSize="sm"
                      fontWeight="bold"
                      borderColor={"gray.600"}
                      {...(index === arr.length - 1 && { border: "none" })}
                    >
                      {el.referral}
                    </Td>
                    <Td
                      
                      fontSize="sm"
                      borderColor={"gray.600"}
                      {...(index === arr.length - 1 && { border: "none" })}
                    >
                      {el.visitors}
                    </Td>
                    <Td
                      
                      fontSize="sm"
                      borderColor={"gray.600"}
                      {...(index === arr.length - 1 && { border: "none" })}
                    >
                      <Flex align="center">
                        <Text
                          
                          fontWeight="bold"
                          fontSize="sm"
                          me="12px"
                        >{`${el.percentage}%`}</Text>
                        <Progress
                          size="xs"
                          colorScheme={el.color}
                          value={el.percentage}
                          minW="120px"
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Card>
    </>
  );
};
