import React from "react";
import { Heading, Text } from "@chakra-ui/react";

const TextHeading = ({ children, fs = "md", mt = 2 }) => {
  return (
    <Heading fontSize={fs} marginTop={mt}>
      <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
        {children}
      </Text>
    </Heading>
  );
};

export default TextHeading;
