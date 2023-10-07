import React, { useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";

const CustomAlert = ({ status, onCloseEvent, msg, isVisible = true }) => {
  useEffect(() => {
    if (isVisible) setTimeout(() => onCloseEvent(), 2500);
  }, [isVisible]);
  return (
    isVisible && (
      <Alert
        status={status}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <CloseButton
          alignSelf="flex-end"
          position="relative"
          right={0}
          top={-5}
          onClick={onCloseEvent}
        />
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {status === "warning" ? "Your submission has failed!" : "Success!"}
        </AlertTitle>
        <AlertDescription maxWidth="sm">{msg}</AlertDescription>
      </Alert>
    )
  );
};

export default CustomAlert;
