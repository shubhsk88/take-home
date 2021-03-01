import { Box, Text } from "@chakra-ui/react";

export const Th = (props) => (
  <Text
    as="th"
    textTransform="uppercase"
    fontSize="xl"
    color="gray.600"
    fontWeight="medium"
    p={4}
    px={8}
    {...props}
  />
);

export const Tr = (props) => (
  <Box
    as="tr"
    backgroundColor="gray.50"
    borderTopRadius={8}
    borderBottom="1px solid"
    borderBottomColor="gray.100"
    height="40px"
    {...props}
  />
);

export const Td = (props) => (
  <Box
    as="td"
    color="gray.900"
    borderBottom="1px solid"
    borderBottomColor="gray.100"
    py={4}
    px={12}
    {...props}
  />
);

export const Table = (props) => (
  <Box
    as="table"
    textAlign="left"
    rounded="xl"
    backgroundColor="white"
    shadow="xl"
    overflow="hidden"
    border="1px solid"
    borderColor="gray.800"
    {...props}
  />
);
