import React from "react";
import { Box, Text } from "@chakra-ui/react";

const PredictionResultBox = ({ predictedData }) => {
  return (
    predictedData.state === "processed" &&
    predictedData.result && (
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          py={12}
          mb={2}
          marginTop={"2"}
        >
          <Text>
            You prefer {predictedData.result} over a{" "}
            {predictedData.result === "tea" ? "coffee" : "tea"}
          </Text>
        </Box>
      </>
    )
  );
};

export default PredictionResultBox;
