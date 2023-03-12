import { Card, chakra } from "@chakra-ui/react";

export const ContainerTable = chakra("div", {
  baseStyle: {
    position: "relative",
  },
});

export const CardTable = chakra(Card, {
  baseStyle: {
    mb: 2,
    pb: 12,
    borderWidth: "1px",
    borderColor: "gray.500",
    borderRadius: "lg",
  },
});
