import { Grid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { NextSeo } from "next-seo";
import { buildNextAuthOption } from "../api/auth/[...nextauth].api";
import Script from "next/script";

import { SalesOverviews } from "@/views/Admin/components/SalesOverviews/SalesOverviews";
import { Performance } from "@/views/Admin/components/Performance/Performance";
import dayjs from "dayjs";
import { StatusCards } from "@/views/Admin/components/StatusCards/StatusCards";
import { PageVisits } from "@/views/Admin/components/PageVisits/PageVisits";
import { SocialTraffic } from "@/views/Admin/components/SocialTraffic/SocialTraffic";
export default function Home() {
  return (
    <>
      <Script src="echarts.js" />
      <NextSeo title="Home | Clinifisio" noindex />
      <div>
        <StatusCards />
        <Grid
          pt={4}
          templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
          templateRows={{ lg: "repeat(2, auto)" }}
          gap="20px"
        >
          <SalesOverviews />
          <Performance />
          <PageVisits />
          <SocialTraffic />
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
