import { gql, useQuery } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";

import DataTable from "./components/DataTable";

import { PER_PAGE } from "./constants";
import { SortingContext } from "./context/sortingContext";

export const TOTAL_PAGE_QUERY = gql`
  query {
    _allUsersMeta {
      count
    }
  }
`;

const GET_USERS = gql`
  query getUsers($skip: Int = 0, $first: Int) {
    allUsers(first: $first, skip: $skip) {
      id
      name
      sales
      company
      quantity
      amount
    }
  }
`;

function App() {
  const [sorting] = useContext(SortingContext);
  console.log(sorting);
  const [page, setPage] = useState(1);
  const [variables, setVariables] = useState({
    skip: PER_PAGE * page - PER_PAGE,
    first: PER_PAGE,
  });
  const { data, loading, error } = useQuery(GET_USERS, {
    variables,
  });

  const {
    data: totalData,
    loading: totalLoading,
    error: totalError,
  } = useQuery(TOTAL_PAGE_QUERY);
  if (loading || totalLoading) return <div>Loading...</div>;
  if (error || totalError) return <div>{JSON.stringify(error)}</div>;
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
      {data?.allUsers ? (
        <DataTable
          rows={data.allUsers}
          heading={["Name", "Sales", "Company", "Quantity", "Amount"]}
        />
      ) : null}
    </>
  );
}

export default App;
