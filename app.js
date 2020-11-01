const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/");
// config dotenv
dotenv.config();
const { PORT, MONGODB_URL } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

//db and server config
const configMongoDB = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(MONGODB_URL, configMongoDB)
  .then(() => {
    console.log("MongoDB is connected.");
    return server.listen({ port: PORT || 5000 });
  })
  .then((res) => {
    console.log(`Server is running at port: ${res.url}`);
  })
  .catch((err) => console.log(err.message));
