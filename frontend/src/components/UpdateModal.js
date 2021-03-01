import { gql, useMutation } from "@apollo/client";
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
  useModal,
  useToast,
} from "@chakra-ui/react";
import { TOTAL_PAGE_QUERY } from "../App";
import useForm from "../utils/useForm";

const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $sales: Float!
    $amount: Float!
    $quantity: Int!
    $company: String!
  ) {
    updateUser(
      id: $id
      data: {
        name: $name
        amount: $amount
        quantity: $quantity
        company: $company
        sales: $sales
      }
    ) {
      id
      name
    }
  }
`;

const UpdateModal = ({ row }) => {
  const { inputs, handleChange } = useForm(row);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: TOTAL_PAGE_QUERY }],
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser();
      toast({
        title: "Success",
        description: "User Updated Successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
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
            <VStack as="form" spacing={4} onSubmit={onSubmit}>
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
              <Button
                my={4}
                w="80%"
                type="submit"
                onClick={onClose}
                colorScheme="teal"
              >
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
