import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { FETCH_POST_QUERY } from "../utils/graphql";

function DeleteButton({ postID, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy, result) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POST_QUERY,
            });
            const newPostsData = data.getPosts.filter((p) => p.id !== postID);
            const newData = { ...data, getPosts: newPostsData };
            proxy.writeQuery({ query: FETCH_POST_QUERY, data: newData });
            if (callback) callback();
        },
        onError(err) {
            console.error(err);
        },
        variables: {
            postID,
        },
    });

    return (
        <>
            <Button
                as="div"
                color="red"
                floated="right"
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postID: ID!) {
        deletePost(postID: $postID)
    }
`;

export default DeleteButton;
