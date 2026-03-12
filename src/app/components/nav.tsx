import { HStack, Link, Box } from "@chakra-ui/react";
import { ColorModeButton } from "src/components/ui/color-mode";
import NextLink from "next/link";

export const links = [
  { name: "home", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "mentorship", href: "/mentorship" },
  { name: "opensource", href: "/opensource" },
];

const Navbar = () => {
  return (
    <Box maxW="1200px" mx="auto" w="100%" px={{ base: 4, md: 8, lg: 12 }} py={4}>
      <HStack w="full" justify="space-between" align="center">
        <HStack gap={{ base: 4, md: 8 }} align="center">
          {links.map((link) => (
            <Link
              asChild
              key={link.name}
              fontWeight="light"
              fontSize={{ base: "sm", md: "md" }}
              style={{ color: 'var(--fg)', textDecoration: 'none' }}
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
        <ColorModeButton />
      </HStack>
    </Box>
  );
};

export default Navbar;

