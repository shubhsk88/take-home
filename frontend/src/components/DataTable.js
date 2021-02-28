import React, { useContext, useMemo, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box } from "@chakra-ui/react";
import { SortingContext } from "../context/sortingContext";

const DataTable = ({
  onSort,
  rows,
  heading,
  sortable = [],
  defaultSortDirection,
}) => {
  const [sorting, setSorting] = useContext(SortingContext);
  const [modifier, setModifier] = useState(0);
  const [headerLogoOrder, setHeaderLogoOrder] = useState(
    heading.map((head) => {
      return { [head]: null };
    })
  );

  console.log(headerLogoOrder);
  console.log(modifier, "Triggered", sorting);
  const onClick = (value) => {
    const valueInLowerCase = value.toLowerCase();
    if (sorting?.sortBy !== valueInLowerCase) {
      setModifier(0);
    }
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
            const rowArray = Object.values(row).slice(2);

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
