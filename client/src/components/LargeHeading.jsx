import React from "react";
import { Heading } from "@chakra-ui/react";

const LargeHeading = ({ children, mt = 5 }) => {
  return (
    <Heading as="h2" marginTop={mt}>
      {children}
    </Heading>
  );
};

export default LargeHeading;
