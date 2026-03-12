"use client";

import { Box, HStack, IconButton, Link, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { ColorModeButton } from "src/components/ui/color-mode";
import NextLink from "next/link";
import { LuMenu, LuX } from "react-icons/lu";

export const links = [
  { name: "home", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "publications", href: "/publications" },
  { name: "mentorship", href: "/mentorship" },
  { name: "opensource", href: "/opensource" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Box maxW="1200px" mx="auto" w="100%" px={{ base: 4, md: 8, lg: 12 }} py={{ base: 3, md: 4 }}>
      <HStack w="full" justify="space-between" align="center" gap={3}>
        <Link
          asChild
          display={{ base: "inline-flex", md: "none" }}
          fontSize="sm"
          fontWeight="medium"
          style={{ color: "var(--fg)", textDecoration: "none" }}
          _hover={{ textDecoration: "none" }}
        >
          <NextLink href="/" onClick={closeMenu}>moeid</NextLink>
        </Link>

        <HStack gap={{ base: 4, md: 8 }} align="center" display={{ base: "none", md: "flex" }}>
          {links.map((link) => (
            <Link
              asChild
              key={link.name}
              fontWeight="light"
              fontSize={{ base: "sm", md: "md" }}
              style={{ color: "var(--fg)", textDecoration: "none" }}
              _hover={{
                fontWeight: "medium",
                outline: "none",
                boxShadow: "none",
                textDecoration: "none",
              }}
              _focus={{ outline: "none", boxShadow: "none" }}
              _focusVisible={{ outline: "none" }}
            >
              <NextLink href={link.href}>{link.name}</NextLink>
            </Link>
          ))}
        </HStack>

        <HStack gap={1}>
          <ColorModeButton />
          <IconButton
            display={{ base: "inline-flex", md: "none" }}
            onClick={toggleMenu}
            variant="ghost"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            size="sm"
          >
            {isMenuOpen ? <LuX /> : <LuMenu />}
          </IconButton>
        </HStack>
      </HStack>

      <Box
        display={{ base: isMenuOpen ? "block" : "none", md: "none" }}
        mt={3}
        borderWidth="1px"
        borderRadius="md"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--bg)",
        }}
      >
        <Stack gap={1} p={2}>
          {links.map((link) => (
            <Link
              asChild
              key={`mobile-${link.name}`}
              display="block"
              px={3}
              py={2}
              borderRadius="sm"
              fontSize="sm"
              style={{ color: "var(--fg)", textDecoration: "none" }}
              _hover={{
                textDecoration: "none",
                backgroundColor: "var(--card-hover-bg)",
              }}
              onClick={closeMenu}
            >
              <NextLink href={link.href}>{link.name}</NextLink>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;

