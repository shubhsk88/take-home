import React from "react";
import ReactDOM from "react-dom";

import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import { SortingProvider } from "./context/sortingContext";

ReactDOM.render(
  <SortingProvider>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </SortingProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
