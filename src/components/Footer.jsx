// src/components/Footer.jsx
import React from "react";
import { Box, Text, Link, Stack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" py={4} bg="gray.800" color="white">
      <Stack spacing={2} textAlign="center">
        <Text>&copy; {new Date().getFullYear()} graduation. All rights reserved.</Text>
        <Link href="/about" color="teal.300">About Us</Link>
        <Link href="/contact" color="teal.300">Contact</Link>
        <Link href="/privacy" color="teal.300">Privacy Policy</Link>
      </Stack>
    </Box>
  );
};

export default Footer;
