import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Container, Link } from "@chakra-ui/react";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container marginTop={4} maxW={"6xl"}>
        <Link href="https://github.com/mehmeteminsalim" isExternal>
          Github <ExternalLinkIcon mx="2px" />
        </Link>
        <Link href="https://www.linkedin.com/in/mehmeteminsalim/" isExternal>
          Linkedin <ExternalLinkIcon mx="2px" />
        </Link>
      </Container>

      <Container maxW={"6xl"}>{children}</Container>
    </>
  );
};

export default Layout;
