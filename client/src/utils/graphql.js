import { gql } from "@apollo/client";

export const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      reactionCount
      commentCount
      reactions {
        username
        createdAt
      }
      comments {
        body
      }
    }
  }
`;
