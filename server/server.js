import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import morgan from "morgan";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers/";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(morgan("tiny"));

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

app.listen({ port: PORT }, () =>
    console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
);
