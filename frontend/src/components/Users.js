import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";

import { PER_PAGE } from "../constants";
import { SortingContext } from "../context/sortingContext";
import DataTable from "./DataTable";

const GET_USERS = gql`
  query getUsers($skip: Int = 0, $first: Int, $sortBy: [SortUsersBy!]) {
    allUsers(first: $first, skip: $skip, sortBy: $sortBy) {
      id
      name
      sales
      company
      quantity
      amount
    }
  }
`;

const Users = ({ page = 1 }) => {
  const [sorting] = useContext(SortingContext);
 
  const { data, loading, error, fetchMore } = useQuery(GET_USERS, {
    variables: {
      skip: PER_PAGE * page - PER_PAGE,
      first: PER_PAGE,
    },
  });

  useEffect(() => {
    if (sorting.sortBy) {
      fetchMore({
        variables: {
          sortBy: [`${sorting.sortBy.toLowerCase()}_${sorting.orderBy}`],
          skip: PER_PAGE * page - PER_PAGE,
          first: PER_PAGE,
        },
      });
    }
  }, [fetchMore, page, sorting.orderBy, sorting.sortBy]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  return (
    <div>
      {data?.allUsers ? (
        <DataTable
          rows={data.allUsers}
          heading={["Name", "Sales", "Company", "Quantity", "Amount"]}
        />
      ) : null}
    </div>
  );
};

export default Users;
