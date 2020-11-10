import React from "react";

function SinglePost(props) {
    const postID = props.match.params.postID;
}

const FETCH_POST_QUERY = gql`
    query($postID: ID!) {
        getPost(postID: $postID) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default SinglePost;
