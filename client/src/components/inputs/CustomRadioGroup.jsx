import React, { useContext } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { PredictionContext } from "../../layout/index.jsx";

const CustomRadioGroup = () => {
  const predictComponentContext = useContext(PredictionContext);
  const { dataset, setDataset } = predictComponentContext;
  return (
    <RadioGroup
      onChange={(e) => setDataset({ ...dataset, sex: e })}
      value={dataset.sex}
    >
      <Stack direction="row">
        <Radio value="0">Male</Radio>
        <Radio value="1">Female</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default CustomRadioGroup;
