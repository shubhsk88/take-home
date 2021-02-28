import { gql, useQuery } from "@apollo/client";

import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";

const GET_USERS = gql`
  query getUsers {
    allUsers(first: 50, skip: 10) {
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
  const { data, loading, error } = useQuery(GET_USERS);
  console.log(data, error);
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Pagination />
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
