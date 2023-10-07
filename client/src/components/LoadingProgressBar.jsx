import React from "react";
import { Progress } from "@chakra-ui/react";

const LoadingProgressBar = ({ loadingState }) => {
  return (
    loadingState && <Progress colorScheme="telegram" size="sm" isIndeterminate />
  );
};

export default LoadingProgressBar;
