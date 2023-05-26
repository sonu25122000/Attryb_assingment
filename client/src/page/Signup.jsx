import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Signup() {
  const [cred, setCred] = useState({});
  const toast = useToast()
  
  //   function to store input data (credential)
  const HandleInput = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };
  console.log(cred);

  // signup function
  const Register = async () => {
    try {
      let r = await fetch(`https://worried-wombat.cyclic.app/register`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let d = await r.json();
        // console.log(d);
        if(d){
          toast({
            title: `${d.msg}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          })
        }
    } catch (error) {
      console.log(error);
      toast({
        title: `somthing went wrong`,
        description: "please try again",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  };

  return (
    <Box position={"relative"} style={{ filter: "blur(x8px)" }}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 3, sm: 20, lg: 20 }}
      >
        <Stack>
          <Image src="https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/2017-Kia-Sorento-SUV-white-press-image-1001x565-top-five-seven-seat-suvs.jpg" />
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Buy Amazing Car
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <Input
                onChange={HandleInput}
                name="name"
                placeholder="fullname"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                onChange={HandleInput}
                name="email"
                type="email"
                placeholder="email"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                onChange={HandleInput}
                name="password"
                placeholder="password"
                type="password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
            <Button
              onClick={Register}
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
