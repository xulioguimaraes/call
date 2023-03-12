import { chakra } from "@chakra-ui/react";
import { Box, Heading, styled, Text } from "@ignite-ui/react";

export const Container = chakra("main", {
  baseStyle: {
    maxWidth: 572,
    marginX: "auto",
    marginY: "28",
    px:0,
    pt: 4,
    bg: "gray.800",
    borderRadius: 'lg'
  },
});

export const Header = chakra("div", {
  baseStyle: {
    paddingLeft: "6",
    paddingRight: "6",
  },
});

// export const Form = styled(Box, {
//   marginTop: "$6",
//   display: "flex",
//   flexDirection: "column",
//   gap: "$4",

//   label: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "$2",
//   },
// });

export const Form = chakra("div", {
  baseStyle: {
    mt: "4",
    display: "flex",
    flexDirection: "column",
    gap: "4",
    p: 5,
    borderRadius: "lg",
  },
});

export const FormError = styled(Text, {
  color: "#f75a68",
});
