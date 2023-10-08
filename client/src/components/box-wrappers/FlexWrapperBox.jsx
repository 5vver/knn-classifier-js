import React from "react";
import { Box } from "@chakra-ui/react";

const FlexWrapperBox = ({
  children,
  direction = "column",
  mt = { base: "3", sm: "0" },
  justifyContent = "center",
}) => {
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection={direction}
      justifyContent={justifyContent}
      marginTop={mt}
    >
      {children}
    </Box>
  );
};

export default FlexWrapperBox;
