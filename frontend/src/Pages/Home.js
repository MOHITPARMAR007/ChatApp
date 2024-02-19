import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import Login from "../Components/Authentication/Login";
  import Signup from "../Components/Authentication/Signup";
const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));

    if (userInformation) navigate("/Chats");
  }, [navigate]);






  return (
    <Container maxw= "xl"  centerContent>
    <Box d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
         <Text fontSize="4xl" fontFamily="Work sans">
         WhisperHub
        </Text>
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
    <Tabs isFitted variant="soft-rounded" >
          <TabList mb="1em">
            <Tab width="50%" _hover={{ bg: "#5D8AA8" }}>Login</Tab>
            <Tab  width="50%" _hover={{ bg: "#5D8AA8" }}> Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>   
    </Box>
  </Container>
  )
}

export default Home