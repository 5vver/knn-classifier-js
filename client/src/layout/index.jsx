/*
  TODO:
    1. !!Component decomposition;
    2. setState(prev => ({prev..., val: ..}));
    3. empty inputs red highlights;
    4. requestOptions decompose;
    5. Alert -> alert toast;
    6. Alert setTimeout -> smooth close;
*/

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Container,
  Divider,
  Heading,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "axios";

/** Assets */
import genderImg from "../assets/gender.jpg";
import getUpImg from "../assets/getup.jpg";
import ageImg from "../assets/age.png";
import employmentImg from "../assets/employment.jpg";
import submitBackgroundImg from "../assets/submitBackground.jpg";

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

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const [isLoading, setIsLoading] = useState(false);
  const [predictedData, setPredictedData] = useState({
    state: "awaiting",
    result: null,
  });

  useEffect(() => {
    if (isVisible) setTimeout(() => onClose(), 2500);
  }, [isVisible]);

  const [alertMsg, setAlertMsg] = useState({ msg: null, status: "success" });
  const sendData = async () => {
    console.log("sending data");
    if (!validateDataset(dataset)) return;
    const formdata = new FormData();
    formdata.append(
      "data",
      JSON.stringify(Object.values(dataset).map((v) => +v)),
    );
    const requestOptions = {
      mode: "no-cors",
      url: "http://localhost:3000/api",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: formdata,
    };
    try {
      setIsLoading(true);
      const response = await axios.request(requestOptions);
      setPredictedData({
        result: response.data > 0 ? "coffee" : "tea",
        state: "processed",
      });
      console.log(predictedData)
    } catch (e) {
      setPredictedData({ ...predictedData, state: "failed" });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const validateDataset = (dataset) => {
    const alertWithMsg = (msg, state) => {
      setAlertMsg({ status: state ? "success" : "warning", msg });
      onOpen();
      return state;
    };
    if (typeof dataset === "object" && Object.values(dataset).some((v) => !v))
      return alertWithMsg("All fields must be filled in!", false);
    return alertWithMsg("Data has been sent!", true);
  };

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1">
        Hey! I'm going to try to predict what you prefer to drink, tea or
        coffee, please provide me with information below:
      </Heading>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
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
                src={genderImg}
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
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
              What's your gender?
            </Text>
          </Heading>
          <RadioGroup
            onChange={(e) => setDataset({ ...dataset, sex: e })}
            value={dataset.sex}
          >
            <Stack direction="row">
              <Radio value="0">Male</Radio>
              <Radio value="1">Female</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Box>
      <Heading as="h2" marginTop="5">
        What time do you get up?
      </Heading>
      <RadioGroup
        onChange={(e) => setDataset({ ...dataset, wakeTime: e })}
        value={dataset.wakeTime}
      >
        <Stack direction="row">
          <Radio value="0">Before 9AM</Radio>
          <Radio value="1">After 9AM</Radio>
        </Stack>
      </RadioGroup>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  transform="scale(1.0)"
                  src={getUpImg}
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
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <Heading fontSize="xl" marginTop="2">
                <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                  What's your sleep length?
                </Text>
              </Heading>
              <NumberInput
                defaultValue={dataset.sleepLength}
                max={20}
                keepWithinRange={true}
                clampValueOnBlur={true}
                onChange={(e) => setDataset({ ...dataset, sleepLength: e })}
                marginTop="2"
              >
                <NumberInputField />
                <NumberInputStepper></NumberInputStepper>
              </NumberInput>
            </Box>
          </Box>
        </WrapItem>
      </Wrap>

      {/*Second part of the form*/}

      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
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
                src={ageImg}
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
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
              What's your age?
            </Text>
          </Heading>
          <NumberInput
            defaultValue={dataset.age}
            max={100}
            keepWithinRange={true}
            clampValueOnBlur={true}
            onChange={(e) => setDataset({ ...dataset, age: e })}
            marginTop="2"
            maxW="60%"
          >
            <NumberInputField />
            <NumberInputStepper></NumberInputStepper>
          </NumberInput>
        </Box>
      </Box>
      <Heading as="h2" marginTop="5">
        Do you have breakfast?
      </Heading>
      <RadioGroup
        onChange={(e) => setDataset({ ...dataset, breakfast: e })}
        value={dataset.breakfast}
      >
        <Stack direction="row">
          <Radio value="0">No, I don't</Radio>
          <Radio value="1">Yes, I actually do</Radio>
        </Stack>
      </RadioGroup>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  transform="scale(1.0)"
                  src={employmentImg}
                  alt="some text"
                  objectFit="contain"
                  width="100%"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <Heading fontSize="xl" marginTop="2">
                <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                  What's your employment state?
                </Text>
              </Heading>
              <RadioGroup
                onChange={(e) => setDataset({ ...dataset, employmentState: e })}
                value={dataset.employmentState}
              >
                <Stack direction="row">
                  <Radio value="0">Neither</Radio>
                  <Radio value="1">I study</Radio>
                  <Radio value="2">I work</Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Box>
        </WrapItem>
      </Wrap>

      {/*Third part of the form*/}

      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">How many hours do you spend at work?</Heading>
        <NumberInput
          defaultValue={dataset.workHours}
          max={15}
          keepWithinRange={true}
          clampValueOnBlur={true}
          onChange={(e) => setDataset({ ...dataset, workHours: e })}
          marginTop="2"
        >
          <NumberInputField />
          <NumberInputStepper></NumberInputStepper>
        </NumberInput>
        <Heading as="h6">How long does it take you to get to work?</Heading>
        <NumberInput
          defaultValue={dataset.travelTimeToWork}
          max={15}
          keepWithinRange={true}
          clampValueOnBlur={true}
          onChange={(e) => setDataset({ ...dataset, travelTimeToWork: e })}
          marginTop="2"
        >
          <NumberInputField />
          <NumberInputStepper></NumberInputStepper>
        </NumberInput>
      </VStack>
      {isLoading && (
        <Progress colorScheme="telegram" size="sm" isIndeterminate />
      )}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        py={12}
        bgImage={submitBackgroundImg}
        bgPosition="center"
        bgRepeat="no-repeat"
        mb={2}
        marginTop={"2"}
      >
        <ButtonGroup gap="4">
          <Button onClick={sendData} colorScheme="telegram" variant="solid">
            Send
          </Button>
        </ButtonGroup>
      </Box>
      {isVisible && (
        <Alert
          status={alertMsg.status}
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
            onClick={onClose}
          />
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {alertMsg.status === "warning"
              ? "Your submission has failed!"
              : "Success!"}
          </AlertTitle>
          <AlertDescription maxWidth="sm">{alertMsg.msg}</AlertDescription>
        </Alert>
      )}
      {predictedData.state === "processed" && predictedData.result && (
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
      )}
    </Container>
  );
};

export default PredictSelection;
