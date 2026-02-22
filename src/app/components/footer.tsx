import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { FaEnvelope, FaGithub, FaLinkedin, FaUserTie } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";


export default function Footer() {
  const connections = [
    {
      label: "Website",
      href: "https://moeidheidari.com",
      icon: RiGlobalLine,
    },
    {
      label: "GitHub",
      href: "https://github.com/moeidheidari",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/moeidheidari",
      icon: FaLinkedin,
    },
    {
      label: "ADPList",
      href: "https://adplist.org/mentors/moeid-heidari",
      icon: FaUserTie,
    },
    {
      label: "Email",
      href: "mailto:hello@moeidheidari.com",
      icon: FaEnvelope,
    },
  ];

  return (
    <footer>
      <Flex wrap="wrap" gap={3} mt={{ base: 2, md: 4 }}>
        {connections.map((connection) => (
          <Link
            key={connection.label}
            href={connection.href}
            target={connection.href.startsWith("http") ? "_blank" : undefined}
            rel={connection.href.startsWith("http") ? "noreferrer" : undefined}
            borderWidth="1px"
            borderColor="whiteAlpha.300"
            borderRadius="md"
            px={{ base: 3, md: 4 }}
            py={{ base: 2, md: 2.5 }}
            _hover={{ textDecoration: "none", borderColor: "whiteAlpha.500" }}
          >
            <Flex align="center" gap={2}>
              <Icon boxSize={4}>
                <connection.icon />
              </Icon>
              <Text fontSize="sm">{connection.label}</Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </footer>
  );
}
