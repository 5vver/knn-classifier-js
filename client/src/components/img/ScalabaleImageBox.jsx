import React from "react";
import { Box, Image } from "@chakra-ui/react";

const ScalabaleImageBox = ({ imgSrc }) => {
  return (
    <Box borderRadius="lg" overflow="hidden">
      <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
        <Image
          transform="scale(1.0)"
          src={imgSrc}
          alt="sleep length"
          objectFit="contain"
          width="100%"
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        />
      </Box>
    </Box>
  );
};

export default ScalabaleImageBox;
