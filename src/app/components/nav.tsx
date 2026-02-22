import { HStack, VStack, Link, Box } from "@chakra-ui/react";

export const links = [
  { name: "home", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "mentorship", href: "/mentorship" },
  { name: "opensource", href: "/opensource" },
];

const Navbar = ({ isMobile = false }) => {
  const LinkComponent = isMobile ? VStack : HStack;

  return (
    <Box maxW="1200px" mx="auto" w="100%" px={{ base: 4, md: 8, lg: 12 }} py={4}>
    <LinkComponent gap={{ base: 4, md: 8 }} align="center">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          fontWeight="light"
          color="white"
          fontSize={{ base: "sm", md: "md" }}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          _hover={{
            color: "white",
            fontWeight:"medium"
          }}
          
        >
          {link.name}
        </Link>
      ))}

      
    </LinkComponent>
    </Box>
  );
};

export default Navbar;

