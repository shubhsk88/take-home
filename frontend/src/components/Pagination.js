import { gql, useQuery } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { PER_PAGE } from "../constants";

export const TOTAL_PAGE_QUERY = gql`
  query {
    _allUsersMeta {
      count
    }
  }
`;

const Pagination = ({ page = 1 }) => {
  const { data, loading, error } = useQuery(TOTAL_PAGE_QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  const { count } = data?._allUsersMeta;
  const totalPage = Math.ceil(count / PER_PAGE);

  return (
    <Box mx="auto" display="flex">
      <Button>Prev</Button>
      <Box>Page 1 of {totalPage}</Box>
      <Button>Next</Button>
    </Box>
  );
};

export default Pagination;
