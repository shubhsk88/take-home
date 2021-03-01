import { Table, Td, Tr, Th } from "./Table";
import { Skeleton } from "@chakra-ui/react";

const SkeltonRow = ({ width }) => {
  return (
    <Tr>
      <Td>
        <Skeleton h="10px" width={width} my={4} />
      </Td>
      <Td>
        <Skeleton h="10px" width={width} my={4} />
      </Td>
      <Td>
        <Skeleton h="10px" width={width} my={4} />
      </Td>
      <Td>
        <Skeleton h="10px" width={width} my={4} />
      </Td>
      <Td>
        <Skeleton h="10px" width={width} my={4} />
      </Td>
    </Tr>
  );
};

const EmptyTableSkelton = ({ headers = [] }) => {
  return (
    <Table>
      <thead>
        {headers.map((header) => (
          <Th key={header}>{header}</Th>
        ))}
      </thead>
      <tbody>
        <SkeltonRow width="125px" />
        <SkeltonRow width="75px" />
        <SkeltonRow width="125px" />
        <SkeltonRow width="50px" />
        <SkeltonRow width="75px" />
      </tbody>
    </Table>
  );
};

export default EmptyTableSkelton;
