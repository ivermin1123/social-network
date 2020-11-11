import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";

import { FETCH_POST_QUERY } from "../utils/graphql";

function DeleteButton({ postID, commentID, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentID ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy, result) {
            setConfirmOpen(false);
            if (!commentID) {
                const data = proxy.readQuery({
                    query: FETCH_POST_QUERY,
                });
                const newPostsData = data.getPosts.filter(
                    (p) => p.id !== postID
                );
                const newData = { ...data, getPosts: newPostsData };
                proxy.writeQuery({ query: FETCH_POST_QUERY, data: newData });
            }
            if (callback) callback();
        },
        onError(err) {
            console.error(err);
        },
        variables: {
            postID,
            commentID,
        },
    });

    return (
        <>
            <Popup
                content={commentID ? "Delete comment" : "Delete post"}
                inverted
                trigger={
                    <Button
                        as="div"
                        color="red"
                        floated="right"
                        onClick={() => setConfirmOpen(true)}
                    >
                        <Icon name="trash" style={{ margin: 0 }} />
                    </Button>
                }
            />
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postID: ID!) {
        deletePost(postID: $postID)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postID: ID!, $commentID: ID!) {
        deleteComment(postID: $postID, commentID: $commentID) {
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;

export default DeleteButton;
