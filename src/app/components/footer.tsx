import { Box, Flex, Grid, Icon, Link, Text } from "@chakra-ui/react";
import { FaEnvelope, FaGithub, FaLinkedin, FaUserTie } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";
import NextLink from "next/link";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/moeidheidari", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/moeidheidari", icon: FaLinkedin },
  { label: "ADPList", href: "https://adplist.org/mentors/moeid-heidari", icon: FaUserTie },
  { label: "Email", href: "mailto:hello@moeidheidari.com", icon: FaEnvelope },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Open Source", href: "/opensource" },
];

export default function Footer() {
  return (
    <footer>
      <Box
        borderTopWidth="1px"
        pt={8}
        mt={4}
        style={{ borderColor: "var(--border-color)" }}
      >
        <Grid
          templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "2fr 1fr 1fr" }}
          gap={{ base: 8, md: 10 }}
          mb={8}
        >
          {/* Identity */}
          <Box>
            <Text fontWeight="semibold" fontSize="md" mb={1}>
              Moeid Heidari
            </Text>
            <Text fontSize="sm" style={{ color: "var(--fg-muted)" }}>
              Senior Platform Engineer
            </Text>
            <Text fontSize="sm" style={{ color: "var(--fg-muted)" }} mb={3}>
              @ Volvo Cars
            </Text>
            <Link
              href="https://moeidheidari.com"
              target="_blank"
              rel="noreferrer"
              fontSize="sm"
              style={{ color: "var(--fg-muted)", textDecoration: "none" }}
              _hover={{ textDecoration: "underline" }}
            >
              <Flex align="center" gap={1}>
                <Icon boxSize={3.5}><RiGlobalLine /></Icon>
                moeidheidari.com
              </Flex>
            </Link>
          </Box>

          {/* Connect */}
          <Box>
            <Text
              fontSize="xs"
              fontWeight="semibold"
              mb={3}
              style={{ color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}
            >
              Connect
            </Text>
            <Flex direction="column" gap={2}>
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  fontSize="sm"
                  style={{ textDecoration: "none" }}
                  _hover={{ textDecoration: "underline" }}
                >
                  <Flex align="center" gap={2}>
                    <Icon boxSize={3.5}><link.icon /></Icon>
                    {link.label}
                  </Flex>
                </Link>
              ))}
            </Flex>
          </Box>

          {/* Navigate */}
          <Box>
            <Text
              fontSize="xs"
              fontWeight="semibold"
              mb={3}
              style={{ color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}
            >
              Navigate
            </Text>
            <Flex direction="column" gap={2}>
              {navLinks.map((link) => (
                <NextLink key={link.label} href={link.href} style={{ fontSize: "0.875rem", textDecoration: "none" }}>
                  <Text
                    fontSize="sm"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {link.label}
                  </Text>
                </NextLink>
              ))}
            </Flex>
          </Box>
        </Grid>

        <Box
          borderTopWidth="1px"
          pt={4}
          style={{ borderColor: "var(--border-color)" }}
        >
          <Text fontSize="xs" style={{ color: "var(--fg-muted)" }}>
            © {new Date().getFullYear()} Moeid Heidari. All rights reserved.
          </Text>
        </Box>
      </Box>
    </footer>
  );
}
