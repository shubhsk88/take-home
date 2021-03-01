import { ApolloClient, InMemoryCache } from "@apollo/client";
import "dotenv/config";
import paginationField from "./utils/paginationField";


const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
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
