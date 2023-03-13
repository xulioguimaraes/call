import { chakra } from "@chakra-ui/react";
import { Box, styled, Text } from "@ignite-ui/react";

export const IntervalBox = chakra("div", {
  baseStyle: {
    marginTop: "6",
    display: "flex",
    flexDirection: "column",
    pb:4
  },
});

export const IntervalContainer = styled("div", {
  border: "1px solid $gray600",
  borderRadius: "$md",
  marginBottom: "$4",
});

export const IntervalItem = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "$3 $4",

  "& + &": {
    borderTop: "1px solid $gray600",
  },
});

export const IntervalDay = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});

export const IntervalInput = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",

  "input::-webkit-calendar-picker-indicator": {
    filter: "invert(100%) brightness(30%)",
  },
});

export const FormError = styled(Text, {
  color: "#f75a88",
  marginBottom: "$2",
});
