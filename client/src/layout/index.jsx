import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    console.log(dataset);
  }, [dataset]);

  const sendData = async () => {
    console.log("sending data");
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(Object.values(dataset)));
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
      const response = await axios.request(requestOptions);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1">
        Hey! I'm going to try to guess your preferences in tea/coffee, please
        provide me with information below:
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
                src={
                  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                }
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
                  src={
                    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  }
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
            {/*<BlogTags tags={['Engineering', 'Product']} marginTop={3} />*/}
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
                src={
                  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                }
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
                  src={
                    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  }
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        py={12}
        bgImage="url('https://bit.ly/2Z4KKcF')"
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
    </Container>
  );
};

export default PredictSelection;
