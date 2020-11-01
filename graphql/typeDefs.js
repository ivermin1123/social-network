const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [CommentFather]!
    likes: [Like]!
  }
  type CommentFather {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
    comments: [CommentChild]!
    likes: [Like]!
  }
  type CommentChild {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
    likes: [Like]!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postID: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postID: String!): String!
    createComment(postID: String!, body: String!): Post!
    deleteComment(postID: String!, commentID: ID!): Post!
    likePost(postID: String!): Post!
  }
`;
