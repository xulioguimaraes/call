import { StatusCard } from "@/components/StatusCard";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Progress,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { NextSeo } from "next-seo";
import { buildNextAuthOption } from "../api/auth/[...nextauth].api";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { BiDollarCircle } from "react-icons/bi";
import Script from "next/script";

import { SalesOverviews } from "@/views/Admin/components/SalesOverviews/SalesOverviews";
import { Performance } from "@/views/Admin/components/Performance/Performance";
import dayjs from "dayjs";
import { destroyCookie } from "nookies";
export default function Home() {
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");
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
      <Script src="echarts.js" />
      <NextSeo title="Home | Clinifisio" noindex />
      <div>
      <SimpleGrid columns={{ base: 1, md: 4, }} spacing={{ base: 5, lg: 5 }}>
        <StatusCard
          title={"DINHEIRO DE HOJE"}
          stat={"R$ 53,89"}
          icon={<BsPerson size={"3em"} />}
        />
        <StatusCard
          title={"USUÁRIOS DE HOJE"}
          stat={"1,000"}
          icon={<FiServer size={"3em"} />}
        />
        <StatusCard
          title={"NOVOS CLIENTES"}
          stat={"7"}
          icon={<GoLocation size={"3em"} />}
        />
        <StatusCard
          title={"TOTAL SALES"}
          stat={"R$ 1002,89"}
          icon={<BiDollarCircle size={"3em"} />}
        />
      </SimpleGrid>
      <Grid
        pt={4}
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        <SalesOverviews />
        <Performance />
        <Card p="0px" maxW={"100%"}>
          <Flex direction="column">
            <Flex align="center" justify="space-between" p="22px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Page visits
              </Text>
              <Button variant="primary" maxH="30px">
                SEE ALL
              </Button>
            </Flex>
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th color="gray.400" borderColor={borderColor}>
                      Page name
                    </Th>
                    <Th color="gray.400" borderColor={borderColor}>
                      Visitors
                    </Th>
                    <Th color="gray.400" borderColor={borderColor}>
                      Unique users
                    </Th>
                    <Th color="gray.400" borderColor={borderColor}>
                      Bounce rate
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pageVisits.map((el, index, arr) => {
                    return (
                      <Tr key={index}>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          fontWeight="bold"
                          borderColor={borderColor}
                          {...(index === arr.length - 1 && { border: "none" })}
                        >
                          {el.pageName}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          {...(index === arr.length - 1 && { border: "none" })}
                          borderColor={borderColor}
                        >
                          {el.visitors}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          {...(index === arr.length - 1 && { border: "none" })}
                          borderColor={borderColor}
                        >
                          {el.uniqueUsers}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          {...(index === arr.length - 1 && { border: "none" })}
                          borderColor={borderColor}
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
        <Card p="0px" maxW={"100%"}>
          <Flex direction="column">
            <Flex align="center" justify="space-between" p="22px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
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
                <Tr bg={tableRowColor}>
                  <Th color="gray.400" borderColor={borderColor}>
                    Referral
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Visitors
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {socialTraffic.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        fontWeight="bold"
                        borderColor={borderColor}
                        {...(index === arr.length - 1 && { border: "none" })}
                      >
                        {el.referral}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        {...(index === arr.length - 1 && { border: "none" })}
                      >
                        {el.visitors}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        {...(index === arr.length - 1 && { border: "none" })}
                      >
                        <Flex align="center">
                          <Text
                            color={textTableColor}
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
      </Grid>
      </div>

      
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOption(req, res)
  );
  const expires = dayjs(session?.expires).isBefore(new Date());
  if (expires || !session) {
    
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
