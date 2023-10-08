/*
  TODO:
    1. -+ !!Component decomposition;
    2. ++ setState(prev => ({prev..., val: ..}));
    3. empty inputs red highlights;
    4. ++ requestOptions decompose;
    5. Alert -> alert toast;
    6. Alert setTimeout -> smooth close;
*/

import { Container, Divider, Heading, VStack } from "@chakra-ui/react";

import { createContext, useEffect, useState } from "react";

/** Assets */
import genderImg from "../assets/gender.jpg";
import getUpImg from "../assets/getup.jpg";
import ageImg from "../assets/age.png";
import employmentImg from "../assets/employment.jpg";
import submitBackgroundImg from "../assets/submitBackground.jpg";

/** Components */
import ImageBoxRadial from "../components/img/ImageBoxRadial.jsx";
import ScalabaleImageBox from "../components/img/ScalabaleImageBox.jsx";
import TextHeading from "../components/headings/TextHeading.jsx";
import LargeHeading from "../components/headings/LargeHeading.jsx";
import BoxButton from "../components/BoxButton.jsx";
import CustomAlert from "../components/CustomAlert.jsx";
import useCustomAlert from "../hooks/useCustomAlert.js";
import PredictionResultBox from "../components/PredictionResultBox.jsx";
import LoadingProgressBar from "../components/LoadingProgressBar.jsx";
import CustomRadioGroup from "../components/inputs/CustomRadioGroup.jsx";
import CustomInputNumber from "../components/inputs/CustomInputNumber.jsx";
import FlexWrapperBox from "../components/box-wrappers/FlexWrapperBox.jsx";
import Wrapper from "../components/box-wrappers/Wrapper.jsx";
import { formRequestOptionsBody, makeRequest } from "../utils/api/index.js";

export const PredictionContext = createContext(null);

const PredictSelection = () => {
  const [dataset, setDataset] = useState({
    sex: "0", // 0 - M, 1 - F
    wakeTime: "0", // 0 - before 9AM, 1 - after 9AM
    sleepLength: null, // numeric value - amount of hours sleeping
    age: null, // numeric value - age
    breakfast: "0", // 0 - does not have breakfast, 1 - does have breakfast
    employmentState: "0", // 0 - neither studies nor works, 1 - studies, 2 - works, 3 - studies and works
    workHours: null, // numeric value - amount of hours at work/college
    travelTimeToWork: null, // numeric value - amount of hours to work/college place
  });

  const [isLoading, setIsLoading] = useState(false);
  const [predictedData, setPredictedData] = useState({
    state: "awaiting",
    result: null,
  });

  const [isVisible, onClose, alertWithMsg, alertMsg] = useCustomAlert();

  useEffect(() => console.log(dataset), [dataset]);

  const sendData = async () => {
    console.log("sending data");
    if (!validateDataset(dataset)) return;
    const formdata = new FormData();
    formdata.append(
      "data",
      JSON.stringify(Object.values(dataset).map((v) => +v)),
    );
    const requestOptions = formRequestOptionsBody(formdata);
    try {
      setIsLoading(true);
      const response = await makeRequest(requestOptions);
      setPredictedData({
        result: response.data > 0 ? "coffee" : "tea",
        state: "processed",
      });
      console.log(predictedData);
    } catch (e) {
      setPredictedData({ ...predictedData, state: "failed" });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const validateDataset = (dataset) => {
    if (typeof dataset === "object" && Object.values(dataset).some((v) => !v))
      return alertWithMsg("All fields must be filled in!", false);
    return alertWithMsg("Data has been sent!", true);
  };

  return (
    <PredictionContext.Provider value={{ dataset, setDataset }}>
      <Container maxW={"7xl"} p="12">
        <Heading as="h1">
          Hey! I'm going to try to predict what you prefer to drink, tea or
          coffee, please provide me with information below:
        </Heading>
        <FlexWrapperBox
          mt={{ base: "1", sm: "5" }}
          direction={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <ImageBoxRadial imgSrc={genderImg} />
          <FlexWrapperBox>
            <TextHeading fs={"4xl"} mt={"1"}>
              What's your gender?
            </TextHeading>
            <CustomRadioGroup radioList={["Male", "Female"]} variable={"sex"} />
          </FlexWrapperBox>
        </FlexWrapperBox>
        <LargeHeading>What time do you get up?</LargeHeading>
        <CustomRadioGroup
          radioList={["Before 9AM", "After 9AM"]}
          variable={"wakeTime"}
        />
        <Divider marginTop="5" />
        <Wrapper>
          <ScalabaleImageBox imgSrc={getUpImg} />
          <FlexWrapperBox>
            <TextHeading fs={"xl"}>What's your sleep length?</TextHeading>
            <CustomInputNumber variable={"sleepLength"} limit={20} />
          </FlexWrapperBox>
        </Wrapper>

        {/*Second part of the form*/}
        <FlexWrapperBox
          mt={{ base: "1", sm: "5" }}
          direction={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <ImageBoxRadial imgSrc={ageImg} />
          <FlexWrapperBox>
            <TextHeading mt={1} fs={"lg"}>
              What's your age?
            </TextHeading>
            <CustomInputNumber variable={"age"} limit={120} />
          </FlexWrapperBox>
        </FlexWrapperBox>
        <LargeHeading>Do you have breakfast?</LargeHeading>
        <CustomRadioGroup
          radioList={["No, I don't", "Yes, I actually do"]}
          variable={"breakfast"}
        />
        <Divider marginTop="5" />
        <Wrapper>
          <ScalabaleImageBox imgSrc={employmentImg} />
          <FlexWrapperBox>
            <TextHeading fs={"xl"} mt={2}>
              What's your employment state?
            </TextHeading>
            <CustomRadioGroup
              radioList={["Neither", "I study", "I work"]}
              variable={"employmentState"}
            />
          </FlexWrapperBox>
        </Wrapper>

        {/*Third part of the form*/}

        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <LargeHeading>How many hours do you spend at work?</LargeHeading>
          <CustomInputNumber variable={"workHours"} limit={15} />
          <LargeHeading mt={2}>
            How long does it take you to get to work?
          </LargeHeading>
          <CustomInputNumber variable={"travelTimeToWork"} limit={15} />
        </VStack>

        <LoadingProgressBar loadingState={isLoading} />
        <BoxButton onClick={sendData} bgImg={submitBackgroundImg} />
        <CustomAlert
          msg={alertMsg.msg}
          status={alertMsg.status}
          onCloseEvent={onClose}
          isVisible={isVisible}
        />
        <PredictionResultBox predictedData />
      </Container>
    </PredictionContext.Provider>
  );
};

export default PredictSelection;
