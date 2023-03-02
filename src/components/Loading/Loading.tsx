import { Box, Stack } from "@chakra-ui/react";
import Image from "next/image";
import logoImage from "../../assets/logo.png";
export const Loading = () => {
  return (
    <Box
      h={"full"}
      transition="1s ease"
      w="full"
      bg={"rgba(0,0,0,.6)"}
      position={"absolute"}
      top="0"
      zIndex={"999999"}
      right={"0"}
      backdropFilter='blur(10px) hue-rotate(360deg)'
    >
      <Box className="animate">
        <Stack w="full" h={"full"} justifyContent="center" align={"center"}>
          <Image width={300} src={logoImage} alt="logo" />
        </Stack>
      </Box>
    </Box>
  );
};
