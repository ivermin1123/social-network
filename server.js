import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers/";

const app = express();

dotenv.config();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

server.applyMiddleware({ app });

//db and server config
const configMongoDB = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};

mongoose
    .connect(process.env.MONGODB_URL, configMongoDB)
    .then(() => {
        console.log("MongoDB connected.");
    })
    .catch((err) => console.log(err.message));

app.listen({ port: process.env.PORT || 5000 }, () =>
    console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT || 5000}${
            server.graphqlPath
        }`
    )
);
