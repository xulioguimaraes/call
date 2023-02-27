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

  const show = asPath !== "admin";
  return (
    <>
      {show && (
        <Box minH="100vh" bg={"gray.900"}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
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
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            {children}
          </Box>
        </Box>
      )}
    </>
  );
}
