import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

function ModalComp() {
  const [Addproduct, setAddProduct] = useState({});
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddProduct({ ...Addproduct, [name]: value });
  };

  const AddDealerProductDeatils = () => {
    fetch(`https://worried-wombat.cyclic.app/dealer/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("cartoken"),
      },
      body: JSON.stringify(Addproduct),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        toast({
          title: "Product has been added",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button bg={"#536DFE"} onClick={onOpen}>
        Add Product
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                onChange={handleChange}
                name="image"
                type="url"
                placeholder="image url"
              />
            </FormControl>
            <FormControl>
              <FormLabel>manufacturer</FormLabel>
              <Input
                onChange={handleChange}
                name="manufacturer"
                placeholder="manufacturer"
              />
            </FormControl>
            <FormControl>
              <FormLabel>name</FormLabel>
              <Input onChange={handleChange} name="name" placeholder="name" />
            </FormControl>

            <FormControl>
              <FormLabel>year</FormLabel>
              <Input
                onChange={handleChange}
                name="year"
                type="number"
                placeholder="year"
              />
            </FormControl>

            <FormControl>
              <FormLabel>list_price</FormLabel>
              <Input
                onChange={handleChange}
                name="list_price"
                placeholder="list_price"
              />
            </FormControl>

            <FormControl>
              <FormLabel>mileage</FormLabel>
              <Input
                onChange={handleChange}
                name="mileage"
                placeholder="mileage"
              />
            </FormControl>

            <FormControl>
              <FormLabel>power</FormLabel>
              <Input
                onChange={handleChange}
                name="power"
                type="number"
                placeholder="power"
              />
            </FormControl>

            <FormControl>
              <FormLabel>max_speed</FormLabel>
              <Input
                type="number"
                onChange={handleChange}
                name="max_speed"
                placeholder="max_speed"
              />
            </FormControl>

            <FormControl>
              <FormLabel>available_colors</FormLabel>
              <Input
                onChange={handleChange}
                name="available_colors"
                placeholder="available_colors"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={AddDealerProductDeatils} colorScheme="blue" mr={3}>
              Add Product
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalComp;
