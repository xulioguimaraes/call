import {
  Box,
  BoxProps,
  Card,
  CardProps,
  Container as CardContainer,
  ChakraComponent,
  forwardRef,
  IconButton,
  IconButtonProps,
  chakra,
  Text,
  FlexProps,
  Flex,
  Collapse,
  CollapseOptions,
  CollapseProps,
} from "@chakra-ui/react";
import { styled } from "@ignite-ui/react";
import { IoClose } from "react-icons/io5";

interface ContainerStyleProps extends CardProps {
  isTimePickerOpen: boolean;
}

export const Container = forwardRef<ContainerStyleProps, "div">(
  ({ isTimePickerOpen, ...props }, ref) => {
    const gtc = isTimePickerOpen ? "1fr 280px" : "1fr";
    const width = !isTimePickerOpen && "540px";
    return (
      <CardContainer
        as={Card}
        margin={"6 auto 0"}
        p="0"
        borderRadius={"lg"}
        gridTemplateColumns={gtc}
        shadow="lg"
        display={"grid"}
        maxW="full"
        position={"relative"}
        ref={ref}
        {...(width && { width })}
        {...props}
      />
    );
  }
);

export const ClosedButton = forwardRef<IconButtonProps, "button">(
  (props, ref) => (
    <IconButton
      {...props}
      ref={ref}
      position="absolute"
      right={1}
      top={1}
      minW={6}
      h={6}
    >
      <IoClose color="white" />
    </IconButton>
  )
);

const width = "280px";

export const TimePicker = chakra("div", {
  baseStyle: {
    borderLeftWidth: "1px",
    borderLeftColor: "gray.600",
    overflowY: "scroll",
    position: "absolute",
    top: "14",
    bottom: 0,
    right: 0,
    px: 4,
    pb: 2,

    width: width,
  },
});
export const HeaderTimePicker = chakra("div", {
  baseStyle: {
    borderLeftWidth: "1px",
    borderLeftColor: "gray.600",
    px: 2,
    py: 2,
    position: "absolute",
    top: 0,
    right: 0,
    bg: "gray.800",
    borderTopRightRadius: "lg",
    width: width,
    height: 14,
  },
});
export const TimePickerHeader = chakra(Text, {
  baseStyle: {
    px: 2,
    fontWeight: "bold",
  },
});
export const TimePickerList = styled("div", {
  marginTop: "$3",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "$2",

  "@media (max-width:900px)": {
    gridTemplateColumns: "2fr",
  },
});
export const TimePickerItem = styled("button", {
  border: 0,
  backgroundColor: "$gray600",
  padding: "$2 0 ",
  cursor: "pointer",
  color: "$gray100",
  borderRadius: "$sm",
  fontSize: "$sm",
  lineHeight: "$base",

  "&:last-child": {
    marginBottom: "$6",
  },

  "&:disabled": {
    background: "none",
    cursor: "default",
    opacity: 0.4,
  },
  "&:not(disabled)": {
    background: "$gray500",
  },
  "&:focus": {
    boxShadow: " 0 0 0 2px $colors$gray100",
  },
});
