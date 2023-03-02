import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../lib/dayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { DefaultSeo } from "next-seo";
import { ChakraProvider, Container } from "@chakra-ui/react";
import SidebarWithHeader from "@/components/SidebarWithHeader";
import theme from "@/lib/chakra-ui";
// import { Menu } from "@/componets/SidebarWithHeader";
import "../styles/styles.css";
import { Loading } from "@/components/Loading/Loading";
import { LoadingProvider, useLoading } from "@/hooks/useLoading/useLoading";
globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { isOpen } = useLoading();
  console.log(isOpen);
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <DefaultSeo
            openGraph={{
              type: "website",
              locale: "pt_BR",
              url: "https://www.urldaaplicação.ie/",
              siteName: "CALL",
            }}
          />
          <LoadingProvider>
            
            <SidebarWithHeader>
              <Component {...pageProps} />
            </SidebarWithHeader>
          </LoadingProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
