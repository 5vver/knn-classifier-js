import React, { useContext } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { PredictionContext } from "../../layout/index.jsx";

const CustomInputNumber = ({ param, limit }) => {
  const predictComponentContext = useContext(PredictionContext);
  const { dataset, setDataset } = predictComponentContext;
  return (
    <NumberInput
      defaultValue={dataset.sleepLength}
      max={limit}
      keepWithinRange={true}
      clampValueOnBlur={true}
      onChange={(e) => setDataset({ ...dataset, [param]: e })}
      marginTop="2"
    >
      <NumberInputField />
      <NumberInputStepper></NumberInputStepper>
    </NumberInput>
  );
};

export default CustomInputNumber;
