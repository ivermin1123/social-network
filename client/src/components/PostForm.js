import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { FETCH_POST_QUERY } from "../utils/graphql";
function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: "",
    });
    const [errors, setErrors] = useState();

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POST_QUERY,
            });
            const newDataPosts = [result.data.createPost, ...data.getPosts];
            const newData = { ...data, getPosts: newDataPosts };
            proxy.writeQuery({ query: FETCH_POST_QUERY, data: newData });
            values.body = "";
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].message);
        },
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2> Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi world!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={errors ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <Message negative>
                    <Message.Header>{errors}</Message.Header>
                </Message>
            )}
        </>
    );
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;
