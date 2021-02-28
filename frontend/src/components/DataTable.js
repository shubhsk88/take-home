import React from "react";
import {
  Table,
  Thead,
  Tbody,
 
  Tr,
  Th,
  Td,
 
  Button,
} from "@chakra-ui/react";

const DataTable = ({
  onSort,
  rows,
  heading,
  sortable,
  defaultSortDirection,
}) => {
  return (
    <Table variant="simple">
      <Thead>
        {heading.map((value, index) => {
          return sortable[index] ? (
            <Th key={value}>{value}</Th>
          ) : (
            <Th key={value}>
              <Button>{value}</Button>
            </Th>
          );
        })}
      </Thead>
      <Tbody overflowY="scroll">
        {rows.map((row) => {
          const rowArray = Object.values(row);
          return (
            <Tr key={row.id}>
              {rowArray.map((data) => (
                <Td key={data}>data</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default DataTable;
