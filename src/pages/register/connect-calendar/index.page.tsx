import { MultiStep } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import { Container, Header } from "../styles";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useLoading } from "@/hooks/useLoading/useLoading";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { AuthError, ConnectBox, ConnectItem } from "./styles";

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();
  
  const hasuthError = !!router.query.error;
  
  const isSignedIn = session.status === "authenticated";
 
  const { closedLoading } = useLoading();
  useEffect(() => {
    closedLoading();
  }, []);

  const handleConnectCalendar = async () => {
    await signIn("google");
  };
  const handleNavigateToNextStep = async () => {
    await router.push("/register/time-intervals");
  };

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Call" noindex />

      <Container>
        <Header>
          <Heading size={"lg"} lineHeight={"base"} as="strong">
            Conecte sua agenda!
          </Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamene as horas
            ocupadas e os novos eventos a medida em que são agendados
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>
        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedIn ? (
              <Button isDisabled>
                Conectado <Check />
              </Button>
            ) : (
              <Button
                rightIcon={<ArrowRight />}
                onClick={handleConnectCalendar}
              >
                Conectar
              </Button>
            )}
          </ConnectItem>

          {hasuthError && (
            <AuthError size={"sm"}>
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Flex align={"center"} justify="flex-end">
            <Button
              rightIcon={<ArrowRight />}
              onClick={handleNavigateToNextStep}
              type="submit"
              isDisabled={!isSignedIn}
            >
              Próximo passo
            </Button>
          </Flex>
        </ConnectBox>
      </Container>
    </>
  );
}
