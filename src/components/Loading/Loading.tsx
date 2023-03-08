import { Box, Fade, ScaleFade, Stack } from "@chakra-ui/react";
import Image from "next/image";
import logoImage from "../../assets/logo.png";
interface LoadingProps {
  isOpen: boolean;
}
export const Loading = ({ isOpen }: LoadingProps) => {
  return (
    <>
      <Box
        h={"100vh"}
        display={isOpen ? "block" : "none"}
        transition="2s ease"
        w="full"
        zIndex={"99"}
        bg={"rgba(0,0,0,.6)"}
        position={"fixed"}
        top="0"
        right={"0"}
        backdropFilter="blur(10px) hue-rotate(360deg)"
      >
        <Box className="animate">
          <Stack w="full" h={"full"} justifyContent="center" align={"center"}>
            <Image width={300} src={logoImage} alt="logo" />
          </Stack>
        </Box>
      </Box>
    </>
  );
};
