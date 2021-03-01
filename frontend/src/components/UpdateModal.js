import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import useForm from "../utils/useForm";

const UpdateModal = ({ row }) => {
  const { inputs, handleChange } = useForm(row);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="link" size="md" color="purple.500" onClick={onOpen}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack as="form" spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={inputs.name}
                  placeholder="First name"
                  name="name"
                  focusBorderColor="primary"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="company" isRequired>
                <FormLabel>Company</FormLabel>
                <Input
                  value={inputs.company}
                  focusBorderColor="primary"
                  placeholder="Company"
                  name="company"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="sales" isRequired>
                <FormLabel>Sales</FormLabel>
                <Input
                  value={inputs.sales}
                  placeholder="Sales"
                  name="sales"
                  type="number"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="amount" isRequired>
                <FormLabel>Amount</FormLabel>
                <Input
                  value={inputs.amount}
                  placeholder="Amount"
                  name="amount"
                  type="number"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="quantity" isRequired>
                <FormLabel>Quantity</FormLabel>
                <Input
                  value={inputs.quantity}
                  placeholder="quantity"
                  name="quantity"
                  type="number"
                  onChange={handleChange}
                />
              </FormControl>
              <Button my={4} w="80%" onClick={onClose} colorScheme="teal">
                Update
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UpdateModal;
