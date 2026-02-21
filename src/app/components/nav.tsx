import { HStack, VStack, Button, Link, Box } from "@chakra-ui/react";
import { BiBorderNone } from "react-icons/bi";

export const links = [
  { name: "home", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "mentorship", href: "/blog" },
  { name: "opensource", href: "/blog" },
];

const Navbar = ({ isMobile = false }) => {
  const LinkComponent = isMobile ? VStack : HStack;

  return (
    <Box px="13%" py={3}>
    <LinkComponent gap={isMobile ? 4 : 8} align="center" backdropBlur={"10"} >
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          fontWeight="light"
          color="white"
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

