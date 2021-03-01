import React, { useContext, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { gql, useMutation } from "@apollo/client";

import { Tr, Td, Table, Th } from "./Table";
import { SortingContext } from "../context/sortingContext";
import { GET_USERS } from "./Users";
const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;
const iconModifier = (headerValues, key) => {
  if (headerValues[key] === "ASC") {
    return <AiFillCaretDown />;
  } else if (headerValues[key] === "DESC") {
    return <AiFillCaretUp />;
  }
};

const DataTable = ({
  onSort,
  rows,
  heading,
  sortable = [],
  defaultSortDirection,
}) => {
  const [sorting, setSorting] = useContext(SortingContext);
  const [deleteUser, { loading }] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: () => [{ query: GET_USERS }],
  });

  const headingObject = heading.reduce((acc, item) => {
    return Object.assign(acc, { [item]: null });
  }, {});
  const [headerIconOrder, setHeaderIconOrder] = useState(headingObject);
  if (loading) return <div>Loading...</div>;

  const onDelete = async (id) => {
    await deleteUser({
      variables: {
        id,
      },
    });
  };
  const onClick = (value) => {
    if (sorting.sortBy) {
      if (sorting.sortBy !== value) {
        setHeaderIconOrder((prev) => ({
          ...prev,

          [sorting.sortBy]: null,
          [value]: "ASC",
        }));

        setSorting((prev) => ({
          ...prev,
          sortBy: value,
          orderBy: "ASC",
        }));
      } else {
        if (sorting.orderBy === "ASC") {
          setHeaderIconOrder((prev) => ({ ...prev, [value]: "DESC" }));
          setSorting({ sortBy: value, orderBy: "DESC" });
        } else {
          setHeaderIconOrder((prev) => ({ ...prev, [value]: "ASC" }));
          setSorting({ sortBy: value, orderBy: "ASC" });
        }
      }
    } else {
      setHeaderIconOrder((prev) => ({ ...prev, [value]: "ASC" }));
      setSorting({ sortBy: value, orderBy: "ASC" });
    }
  };

  return (
    <Box w="100%">
      <Table h="70vh">
        <thead>
          {heading.map((value, index) => {
            return !sortable[index] ? (
              <Th key={value}>{value}</Th>
            ) : (
              <Th key={value}>
                <Button
                  variant="ghost"
                  fontSize="inherit"
                  textTransform="uppercase"
                  onClick={() => onClick(value)}
                  rightIcon={iconModifier(headerIconOrder, value)}
                >
                  {value}
                </Button>
              </Th>
            );
          })}
        </thead>
        <Box as="tbody" overflowY="scroll">
          {rows.map((row) => {
            const rowArray = Object.values(row).slice(2);

            return (
              <Tr key={row.id}>
                {rowArray.map((data) => (
                  <Td key={data}>{data}</Td>
                ))}
                <Td>
                  <Button
                    variant="link"
                    size="lg"
                    onClick={() => onDelete(row.id)}
                    color="red.400"
                    fontWeight="bold"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Box>
      </Table>
    </Box>
  );
};

export default DataTable;
