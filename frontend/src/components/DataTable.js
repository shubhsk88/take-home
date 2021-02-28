import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box } from "@chakra-ui/react";

const DataTable = ({
  onSort,
  rows,
  heading,
  sortable,
  defaultSortDirection,
}) => {
  return (
    <Box maxW="1200px" margin="4rem auto">
      <Table variant="simple">
        <Thead>
          {heading.map((value) => (
            <Th key={value}>{value}</Th>
          ))}
          {/* {heading.map((value, index) => {
          return Boolean(sortable[index]) ? (
            <Th key={value}>{value}</Th>
          ) : (
            <Th key={value}>
              <Button>{value}</Button>
            </Th>
          );
        })} */}
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
