import { gql } from "@apollo/client";

export const FETCH_POST_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            commentCount
            likes {
                username
                createdAt
            }
            comments {
                body
            }
        }
    }
`;
