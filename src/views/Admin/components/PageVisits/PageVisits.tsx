import {
  Box,
  Button,
  Card,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const PageVisits = () => {
  const pageVisits = [
    {
      pageName: "/argon/",
      visitors: "4,569",
      uniqueUsers: 340,
      bounceRate: "46,53%",
    },
    {
      pageName: "/argon/index.html",
      visitors: "3,985",
      uniqueUsers: 319,
      bounceRate: "46,53%",
    },
    {
      pageName: "/argon/charts.html",
      visitors: "3,513",
      uniqueUsers: 294,
      bounceRate: "36,49%",
    },
    {
      pageName: "/argon/tables.html",
      visitors: "2,050",
      uniqueUsers: 147,
      bounceRate: "50,87%",
    },
    {
      pageName: "/argon/profile.html",
      visitors: "1,795",
      uniqueUsers: 190,
      bounceRate: "46,53%",
    },
  ];
  return (
    <>
      <Card p="0px" maxW={"100%"}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" fontWeight="bold">
              Page visits
            </Text>
            <Button variant="primary" maxH="30px">
              SEE ALL
            </Button>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <Table>
              <Thead>
                <Tr>
                  <Th color="gray.400" borderColor={"gray.600"}>
                    Page name
                  </Th>
                  <Th color="gray.400" borderColor={"gray.600"}>
                    Visitors
                  </Th>
                  <Th color="gray.400" borderColor={"gray.600"}>
                    Unique users
                  </Th>
                  <Th color="gray.400" borderColor={"gray.600"}>
                    Bounce rate
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {pageVisits.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td
                        fontSize="sm"
                        fontWeight="bold"
                        borderColor={"gray.600"}
                        {...(index === arr.length - 1 && {
                          border: "none",
                        })}
                      >
                        {el.pageName}
                      </Td>
                      <Td
                        fontSize="sm"
                        {...(index === arr.length - 1 && {
                          border: "none",
                        })}
                        borderColor={"gray.600"}
                      >
                        {el.visitors}
                      </Td>
                      <Td
                        fontSize="sm"
                        {...(index === arr.length - 1 && {
                          border: "none",
                        })}
                        borderColor={"gray.600"}
                      >
                        {el.uniqueUsers}
                      </Td>
                      <Td
                        fontSize="sm"
                        {...(index === arr.length - 1 && {
                          border: "none",
                        })}
                        borderColor={"gray.600"}
                      >
                        {el.bounceRate}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Card>
    </>
  );
};
