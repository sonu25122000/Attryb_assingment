import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalComp from "./modal";
const Dealer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("cartoken");
    if (token == null) {
      navigate("/login");
      return;
    }
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [Allproduct, setAllProduct] = useState([]);
  const toast = useToast();
  const [obj, setObj] = useState({});
  const [orderPrice, setOrderPrice] = useState("");
  const [Ordermilegae, setOrdermilegae] = useState("");
  const [SearchText, setSearchText] = useState("");
  const [ProductID, setProductID] = useState("");
  const HandleUpadateData = (e) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });
  };

  // get all the data for loggedin user
  const getAllData = async () => {
    fetch(`http://localhost:8080/dealer/car`, {
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
        setAllProduct(res);
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    //
  }, [orderPrice, Ordermilegae, SearchText]);

  // update product deatils
  const HandleUpadteproductDeatils = () => {
    fetch(`http://localhost:8080/dealer/update/${ProductID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("cartoken"),
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        getAllData();
        onClose();
        toast({
          title: `product has been updated`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: "something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  // delete a particular product
  const handleDelete = async (id) => {
    try {
      let r = await fetch(`http://localhost:8080/dealer/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("cartoken"),
        },
      });
      let d = await r.json();
      if (d) {
        toast({
          title: "Product Deleted",
          description: "Now you can't see the deleted product in Ui.",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
      getAllData();
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const saveId = (id) => {
    setProductID(id);
  };
  // sort  by price
  const handlePrice = async (e) => {
    let order = e.target.value;
    setOrderPrice(order);
    if (order === "asc") {
      let res = Allproduct.sort((a, b) => a.list_price - b.list_price);
      console.log(res);
      setAllProduct(res);
    } else if (order === "desc") {
      let res = Allproduct.sort((a, b) => b.list_price - a.list_price);
      setAllProduct(res);
      console.log(res);
    }
  };

  // sort by milage
  const handleMilage = async (e) => {
    let order = e.target.value;
    setOrdermilegae(order);
    if (order === "asc") {
      let res = Allproduct.sort((a, b) => a.mileage - b.mileage);
      console.log(res);
      setAllProduct(res);
    } else if (order === "desc") {
      let res = Allproduct.sort((a, b) => b.mileage - a.mileage);
      setAllProduct(res);
      console.log(res);
    }
  };

  // search by product name
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const HandleSearchProductByName = () => {
    let Ans = Allproduct.filter(function (e) {
      return e.name === SearchText;
    });
    setAllProduct(Ans);
  };

  return (
    <div style={{ marginBottom: "10%" }}>
      <Flex w={"90%"} m="auto" mb={"2%"} mt={"3%"}>
        <Box>
          <InputGroup>
            <Input
              type="text"
              onChange={handleSearch}
              placeholder="Search Product By Name"
            />
            <InputLeftAddon
              onClick={HandleSearchProductByName}
              children={<Icon as={SearchIcon} />}
            />
          </InputGroup>
        </Box>
        <Spacer />
        <Box>
          <Select placeholder="Sort By Price" onChange={handlePrice}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Box>
        <Spacer />

        <Box>
          <Select placeholder="Sort By milage" onChange={handleMilage}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Box>
        <Spacer />

        <ModalComp />
      </Flex>
      <Heading>Product Deatils of Dealer</Heading>
      <TableContainer w={"90%"} m="auto">
        <Table variant="none">
          <Thead bg={"#f7f7f7"}>
            <Tr>
              <Th>Image</Th>
              <Th>manufacturer</Th>
              <Th>name</Th>
              <Th>year</Th>
              <Th>list_price</Th>
              <Th>available_colors</Th>
              <Th>mileage</Th>
              <Th>power</Th>
              <Th>max_speed</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody border="1px solid">
            {Allproduct?.map((el, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <img src={el.image} alt="" />
                  </Td>
                  <Td>{el.manufacturer}</Td>
                  <Td>{el.name}</Td>
                  <Td>{el.year}</Td>
                  <Td>{el.list_price}</Td>
                  <Td>{el.available_colors[0]}</Td>
                  <Td>{el.mileage}</Td>
                  <Td>{el.power}</Td>
                  <Td>{el.max_speed}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        onOpen();
                        saveId(el._id);
                      }}
                    >
                      Edit
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Update product Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Input
                            name="manufacturer"
                            placeholder="manufacturer"
                            onChange={HandleUpadateData}
                          />{" "}
                          <br /> <br />
                          <Input
                            name="name"
                            placeholder="name"
                            onChange={HandleUpadateData}
                          />
                          <br /> <br />
                          <Input
                            name="image"
                            type="url"
                            placeholder="image url"
                            onChange={HandleUpadateData}
                          />
                          <br /> <br />
                          <Input
                            name="year"
                            type="number"
                            placeholder="year"
                            onChange={HandleUpadateData}
                          />
                          <br /> <br />
                          <Input
                            name="mileage"
                            placeholder="mileage"
                            onChange={HandleUpadateData}
                          />
                          <br /> <br />
                          <Input
                            name="power"
                            type="number"
                            placeholder="power"
                            onChange={HandleUpadateData}
                          />
                          <br /> <br />
                          <Input
                            name="max_speed"
                            type="number"
                            placeholder="max_speed"
                            onChange={HandleUpadateData}
                          />
                          <br /> <br />
                          <Input
                            name="list_price"
                            placeholder="list_price"
                            onChange={HandleUpadateData}
                          />
                          <br /> <br />
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            onClick={HandleUpadteproductDeatils}
                            colorScheme="blue"
                            mr={3}
                          >
                            Update
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Td>
                  <Td>
                    <Button onClick={() => handleDelete(el._id)}>Delete</Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dealer;
