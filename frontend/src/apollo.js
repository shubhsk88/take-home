import { ApolloClient, InMemoryCache } from "@apollo/client";
import paginationField from "./utils/paginationField";

const client = new ApolloClient({
  uri: "http://localhost:4000/admin/api",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allUsers: paginationField(),
        },
      },
    },
  }),
});

export default client;
