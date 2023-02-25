import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { NextSeo } from "next-seo";
import { buildNextAuthOption } from "../api/auth/[...nextauth].api";

export default function Home() {
  return (
    <>
      <NextSeo title="Home | Clinifisio" noindex />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOption(req, res)
  );
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  console.log(session);
  return {
    props: {
      session,
    },
  };
};
