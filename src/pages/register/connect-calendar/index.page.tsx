import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasuthError = !!router.query.error;

  const isSignedIn = session.status === "authenticated";

  const handleConnectCalendar = async () => {
    await signIn("google");
  };
  const handleNavigateToNextStep = async () => {
    await router.push("/register/time-intervals");
  };

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Call" noindex/>

      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
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
              <Button size="sm" disabled>
                Conectado <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasuthError && (
            <AuthError size={"sm"}>
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button
            onClick={handleNavigateToNextStep}
            type="submit"
            disabled={!isSignedIn}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  );
}
