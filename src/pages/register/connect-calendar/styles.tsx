import { Box, chakra } from "@chakra-ui/react";
import { styled, Text } from "@ignite-ui/react";

export const ConnectBox = chakra(Box, {
  baseStyle: {
    mt: 10,
    px: 6,
    pb: 5,
  },
});

export const ConnectItem = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: "1px",
    borderColor: "gray.600",

    px: "6",
    py: "4",
    borderRadius: "md",
    marginBottom: "4",
  },
});

export const AuthError = styled(Text, {
  color: "#f75a68",
  marginBottom: "$6",
});
