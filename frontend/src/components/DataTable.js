import React, { useContext, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box } from "@chakra-ui/react";
import { SortingContext } from "../context/sortingContext";

const DataTable = ({
  onSort,
  rows,
  heading,
  sortable = [],
  defaultSortDirection,
}) => {
  const [, setSorting] = useContext(SortingContext);
  const [modifier, setModifier] = useState(0);
  const onClick = (value) => {
    
  };

  return (
    <Box maxW="1200px" margin="4rem auto">
      <Table variant="simple">
        <Thead>
          {heading.map((value, index) => {
            return sortable[index] ? (
              <Th key={value}>{value}</Th>
            ) : (
              <Th key={value}>
                <Button onClick={() => onClick(value)}>{value}</Button>
              </Th>
            );
          })}
        </Thead>
        <Tbody overflowY="scroll">
          {rows.map((row) => {
            console.log(row);
            const rowArray = Object.values(row).slice(2);
            console.log(rowArray);
            return (
              <Tr key={row.id}>
                {rowArray.map((data) => (
                  <Td key={data}>{data}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DataTable;
