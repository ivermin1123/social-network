import {
    InMemoryCache,
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    concat,
    ApolloLink,
} from "@apollo/client";
import React from "react";
import App from "./App";

const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("jwtToken");
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : null,
        },
    });

    return forward(operation);
});

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
