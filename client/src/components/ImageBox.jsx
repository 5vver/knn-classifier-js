import React from "react";
import { Box, Image, useColorModeValue } from "@chakra-ui/react";

const ImageBox = ({ imgSrc }) => {
  return (
    <Box
      display="flex"
      flex="1"
      marginRight="3"
      position="relative"
      alignItems="center"
    >
      <Box
        width={{ base: "100%", sm: "85%" }}
        zIndex="2"
        marginLeft={{ base: "0", sm: "5%" }}
        marginTop="5%"
      >
        <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
          <Image
            borderRadius="lg"
            src={imgSrc}
            alt="some good alt text"
            objectFit="contain"
          />
        </Box>
      </Box>
      <Box zIndex="1" width="100%" position="absolute" height="100%">
        <Box
          bgGradient={useColorModeValue(
            "radial(orange.600 1px, transparent 1px)",
            "radial(orange.300 1px, transparent 1px)",
          )}
          backgroundSize="20px 20px"
          opacity="0.4"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export default ImageBox;
