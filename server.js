import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers/";

dotenv.config();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

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
        return server.listen({ port: process.env.PORT || 5000 });
    })
    .then((res) => {
        console.log(`🚀 Server is running at port: ${res.url}`);
    })
    .catch((err) => console.log(err.message));
