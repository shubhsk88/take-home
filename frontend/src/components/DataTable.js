import React, { useContext, useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import { Tr, Td, Table, Th } from "./Table";
import { SortingContext } from "../context/sortingContext";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

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

  const [headerIconOrder, setHeaderIconOrder] = useState(() =>
    heading.reduce((acc, item) => {
      return Object.assign(acc, { [item]: null });
    }, {})
  );
  console.log(headerIconOrder);

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
    <Box maxW="1200px" margin="4rem auto">
      <Table>
        <thead>
          {heading.map((value, index) => {
            return sortable[index] ? (
              <Th key={value}>{value}</Th>
            ) : (
              <Th key={value}>
                <Button
                  variant="ghost"
                  onClick={() => onClick(value)}
                  rightIcon={iconModifier(headerIconOrder, value)}
                >
                  {value}
                </Button>
              </Th>
            );
          })}
        </thead>
        <tbody>
          {rows.map((row) => {
            const rowArray = Object.values(row).slice(2);

            return (
              <Tr key={row.id}>
                {rowArray.map((data) => (
                  <Td key={data}>{data}</Td>
                ))}
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
};

export default DataTable;
