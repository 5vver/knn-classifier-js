import React from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";

const BoxButton = ({ onClick, bgImg }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      py={12}
      bgImage={bgImg}
      bgPosition="center"
      bgRepeat="no-repeat"
      mb={2}
      marginTop={"2"}
    >
      <ButtonGroup gap="4">
        <Button onClick={onClick} colorScheme="telegram" variant="solid">
          Send
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default BoxButton;
