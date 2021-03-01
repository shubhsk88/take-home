import { gql, useQuery } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import DataTable from "./components/DataTable";
import Users from "./components/Users";

import { PER_PAGE } from "./constants";
import { SortingContext } from "./context/sortingContext";

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
    <>
      <Box mx="auto" display="flex" p={16}>
        <Button disabled={page <= 1} onClick={onPrev}>
          Prev
        </Button>
        <Box px={4} py={2}>
          Page {page} of {totalPage}
        </Box>
        <Button disabled={page >= totalPage} onClick={onNext}>
          Next
        </Button>
      </Box>
      <Users page={page} />
    </>
  );
}

export default App;
