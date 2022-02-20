import { Container } from "@chakra-ui/react";
import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW={"6xl"}>{children}</Container>
    </>
  );
};

export default Layout;