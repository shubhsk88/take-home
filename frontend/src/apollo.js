import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

const link = createHttpLink({ uri: "http://localhost:4000/admin/api" });
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
