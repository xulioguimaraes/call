import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../lib/dayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { DefaultSeo } from "next-seo";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "@/components/SidebarWithHeader";
// import { Menu } from "@/componets/SidebarWithHeader";

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ChakraProvider>
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
          {/* <Menu /> */}
          <SidebarWithHeader>
            <Component {...pageProps} />
          </SidebarWithHeader>
        </SessionProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
