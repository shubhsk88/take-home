import { gql, useQuery } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import Users from "./components/Users";

import { PER_PAGE } from "./constants";

export const TOTAL_PAGE_QUERY = gql`
  query {
    _allUsersMeta {
      count
    }
  }
`;

function App() {
  const [page, setPage] = useState(1);

  const {
    data: totalData,
    loading: totalLoading,
    error: totalError,
  } = useQuery(TOTAL_PAGE_QUERY);
  if (totalLoading) return <div>Loading...</div>;
  if (totalError) return <div>{JSON.stringify(totalError)}</div>;
  const { count } = totalData?._allUsersMeta;
  const totalPage = Math.ceil(count / PER_PAGE);
  const onPrev = () => {
    setPage(page - 1);
  };
  const onNext = () => {
    setPage(page + 1);
  };

  return (
    <Box maxW="1200px" mx="auto" my={12}>
      <Box
        my={8}
        p={4}
        display="flex"
        w="max-content"
        fontSize="2xl"
        borderRadius={8}
        border="1px solid"
        borderColor="gray.200"
        alignItems="center"
      >
        <Button
          variant="link"
          fontSize="inherit"
          p={4}
          borderColor="gray.50"
          size="lg"
          leftIcon={<BsArrowLeft />}
          disabled={page <= 1}
          onClick={onPrev}
        >
          Prev
        </Button>
        <Box px={4} h="100%" py={2}>
          Page {page} of {totalPage}
        </Box>
        <Button
          variant="link"
          fontSize="inherit"
          p={4}
          borderColor="gray.50"
          size="lg"
          rightIcon={<BsArrowRight />}
          disabled={page >= totalPage}
          onClick={onNext}
        >
          Next
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <Users page={page} />
      </Box>
    </Box>
  );
}

export default App;
