import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Container maxW={"6xl"}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"} gap={4}>
              <Box fontSize={"2xl"} fontWeight={"bold"}>
                Mehmet Emin Salim
              </Box>
            </Box>

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Header;
