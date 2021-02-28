import { gql, useQuery } from "@apollo/client";

import DataTable from "./components/DataTable";

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
  if (loading) <div>Loading...</div>;
  return data?.allUsers ? (
    <DataTable
      rows={data.allUsers}
      heading={["Name", "Sales", "Company", "Quantity", "Amount"]}
    />
  ) : null;
}

export default App;
