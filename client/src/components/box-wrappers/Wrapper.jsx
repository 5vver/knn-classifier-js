import React from "react";
import { Box, Wrap, WrapItem } from "@chakra-ui/react";

const Wrapper = ({ children }) => {
  return (
    <Wrap spacing="30px" marginTop="5">
      <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
        <Box w="100%">{children}</Box>
      </WrapItem>
    </Wrap>
  );
};

export default Wrapper;
