import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Allproduct = () => {
  const [product, setProduct] = useState([]);

  // get all product data

  const getAllData = async () => {
    fetch(`http://localhost:8080/allcardata`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("cartoken"),
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setProduct(res);
      })
      .catch((err) => console.log(err.message));
  };

  console.log(product);
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div>
      <SimpleGrid
        spacing={4}
        px={20}
        templateColumns="repeat(auto-fill, minmax(270px, 1fr))"
      >
        {product?.map((item) => {
          return (
            <Card maxW="sm">
              <CardBody>
                <Image
                  src={item.image}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">
                    Manufacturer : {item.manufacturer}
                  </Heading>
                  <Text color="blue.600">Name : {item.name}</Text>
                  <Text color="blue.600">Power : {item.power}</Text>
                  <Text>
                    color :{" "}
                    {item.available_colors?.map((el) => {
                      return (
                        <>
                          <Button color="blue.600">{el}</Button>{" "}
                        </>
                      );
                    })}
                  </Text>
                  <Text color="blue.600">Price : {item.list_price}</Text>
                  <Text color="blue.600">mileage : {item.mileage}km/h</Text>
                  <Text color="blue.600">max_speed : {item.max_speed}kms</Text>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default Allproduct;
