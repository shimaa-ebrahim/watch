import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // Ensure this path is correct
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { useRef } from "react";

const Navbar = () => {
  const { user, signInWithGoogle, logout, isLoading } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef();

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log("Error:", error);
      toast({
        title: "Login Failed",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    onOpen(); // Open the confirmation dialog
  };

  const confirmLogout = async () => {
    await logout();
    onClose(); // Close the dialog after logout
  };

  // If loading, show a loader or nothing
  if (isLoading) return <Box>Loading...</Box>; // Or a spinner

  return (
    <>
      <Box py="4" mb="2" bg="#2C3E50"> {/* Navbar background color */}
        <Container maxW={"container.xl"}>
          <Flex justifyContent={"space-between"}>
            <Link to="/">
              <Box
                fontSize={"4xl"}
                fontWeight={"bold"}
                color={"#E74C3C"} // Red color for logo text
                letterSpacing={"widest"}
                fontFamily={"mono"}
                border={"2px solid #E74C3C"} // Red border
                borderRadius={"md"}
                padding={"8px"}
                margin={"4px"}
                display={"inline-block"}
              >
                watchy
              </Box>
            </Link>

            {/* DESKTOP */}
            <Flex
              gap="4"
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
            >
              <Link to="/">
                <Text
                  color="#ECF0F1" // Light gray color for links
                  _hover={{ color: "#E74C3C", textDecoration: "underline" }} // Red on hover
                  fontSize="lg"
                >
                  Home
                </Text>
              </Link>
              <Link to="/movies">
                <Text
                  color="#ECF0F1"
                  _hover={{ color: "#E74C3C", textDecoration: "underline" }}
                  fontSize="lg"
                >
                  Movies
                </Text>
              </Link>
              <Link to="/shows">
                <Text
                  color="#ECF0F1"
                  _hover={{ color: "#E74C3C", textDecoration: "underline" }}
                  fontSize="lg"
                >
                  TV Shows
                </Text>
              </Link>
              <Link to="/search">
                <SearchIcon color="#ECF0F1" fontSize={"xl"} />
              </Link>
              {user ? (
                <Menu>
                  <MenuButton aria-label="User Menu">
                    <Avatar
                      bg={"#E74C3C"} // Red background for avatar
                      color={"white"}
                      size={"sm"}
                      name={user?.email}
                    />
                  </MenuButton>
                  <MenuList>
                    <Link to="/watchlist">
                      <MenuItem>Watchlist</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Avatar
                  size={"sm"}
                  bg={"gray.800"}
                  as="button"
                  onClick={handleGoogleLogin}
                />
              )}
            </Flex>

            {/* Mobile */}
            <Flex
              display={{ base: "flex", md: "none" }}
              alignItems={"center"}
              gap="4"
            >
              <Link to="/search">
                <SearchIcon color="#ECF0F1" fontSize={"xl"} />
              </Link>
              <IconButton onClick={onOpen} icon={<HamburgerIcon />} aria-label="Open Menu" />
              <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg={"#34495E"}> {/* Dark blue-gray background for drawer */}
                  <DrawerCloseButton />
                  <DrawerHeader>
                    {user ? (
                      <Flex alignItems="center" gap="2">
                        <Avatar bg="#E74C3C" size={"sm"} name={user?.email} />
                        <Box fontSize={"sm"} color={"#ECF0F1"}>
                          {user?.displayName || user?.email}
                        </Box>
                      </Flex>
                    ) : (
                      <Avatar
                        size={"sm"}
                        bg="gray.800"
                        as="button"
                        onClick={handleGoogleLogin}
                      />
                    )}
                  </DrawerHeader>

                  <DrawerBody>
                    <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                      <Link to="/" color="#ECF0F1">Home</Link>
                      <Link to="/movies" color="#ECF0F1">Movies</Link>
                      <Link to="/shows" color="#ECF0F1">TV Shows</Link>
                      {user && (
                        <>
                          <Link to="/watchlist" color="#ECF0F1">Watchlist</Link>
                          <Button
                            variant={"outline"}
                            colorScheme="red"
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </>
                      )}
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={"#2C3E50"} color={"#ECF0F1"}> {/* Dialog with dark background */}
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} bg={"#95A5A6"} color={"white"}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Navbar;
