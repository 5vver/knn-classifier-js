import React, { useContext } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { PredictionContext } from "../../layout/index.jsx";

const CustomRadioGroup = ({ radioList = [], variable }) => {
  const predictComponentContext = useContext(PredictionContext);
  const { dataset, setDataset } = predictComponentContext;
  return (
    <RadioGroup
      onChange={(e) => setDataset(prev => ({ ...prev, [variable]: e }))}
      value={dataset[variable]}
    >
      <Stack direction="row">
        {radioList.map((radioEl, idx) => (
          <Radio key={idx} value={`${idx}`}>
            {radioEl}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default CustomRadioGroup;
