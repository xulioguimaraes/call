import {
  Text,
  Box,
  Drawer,
  useDisclosure,
  DrawerContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { MobileNav } from "./components/MobileNav";
import { SidebarContent } from "./SidBarContent";

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const asPath = router.asPath;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const show = asPath.includes("/admin");
  if (!show) {
    return <>{children}</>;
  }

  return (
    <>
      {/* <Box bgColor="blue.600" w="full" h={"full"} position="fixed" /> */}
      <Box minH="100vh">
        <SidebarContent
          onClose={() => onClose}
          display={["none", "none", "none", "block"]}
          m="2"
          h="98%"
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} h="full"/>
          </DrawerContent>
        </Drawer>
        <MobileNav onOpen={onOpen} />
        <Box ml={[0,0,0,72]} p="4">
          {children}
        </Box>
      </Box>
    </>
  );
}
