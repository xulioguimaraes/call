import { chakra } from "@chakra-ui/react";
import { Box, styled, Text } from "@ignite-ui/react";

export const ProfileBox = chakra("div", {
  baseStyle: {
    marginTop: "6",
    w: "full",
    display: "flex",
    flexDirection: "column",
    gap: "4",
    px:6,
    pb:6
  },
});

export const FromAnnotation = styled(Text, {
  color: "$gray200",
});
