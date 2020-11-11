import React, { useContext, useRef, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
    Grid,
    Image,
    Card,
    Button,
    Icon,
    Label,
    CommentGroup,
    Header,
    Comment,
    Input,
} from "semantic-ui-react";
import moment from "moment";

import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

function SinglePost(props) {
    const postID = props.match.params.postID;
    const { user } = useContext(AuthContext);
    const [comment, setComment] = useState("");

    const { loading, data, error } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postID,
        },
    });

    const [postComment] = useMutation(POST_COMMENT_MUTATION, {
        update(_, result) {
            setComment("");
        },
        variables: {
            postID,
            body: comment,
        },
    });

    function deletePostCallBack() {
        props.history.push("/");
    }

    let postMarkup;
    if (loading) {
        postMarkup = <p>Loading post ...</p>;
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount,
        } = data.getPost;

        postMarkup = (
            <Grid columns={1} style={{ maxWidth: 700, margin: "auto" }}>
                <Grid.Column>
                    <Card fluid>
                        <Image
                            src="/images/avatar/avatar_cat_cute.jpg"
                            wrapped
                            ui={false}
                        />
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                            <LikeButton
                                user={user}
                                post={{ id, likeCount, likes }}
                            />
                            <Button
                                as="div"
                                labelPosition="right"
                                onClick={() => console.log("Comment on post")}
                            >
                                <Button basic color="blue">
                                    <Icon name="comments" />
                                </Button>
                                <Label basic color="blue" pointing="left">
                                    {commentCount}
                                </Label>
                            </Button>
                            {user && user.username === username && (
                                <DeleteButton
                                    postID={postID}
                                    callback={deletePostCallBack}
                                />
                            )}
                        </Card.Content>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Input
                                        type="text"
                                        name="comment"
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        action={{
                                            icon: "comment",
                                            disabled: comment.trim() === "",
                                            onClick: postComment,
                                        }}
                                        placeholder="Coment..."
                                    />
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map((comment) => (
                            <Card
                                fluid
                                key={comment.id}
                                style={{ padding: 10 }}
                            >
                                <Card.Content>
                                    {user &&
                                        user.username === comment.username && (
                                            <DeleteButton
                                                postID={postID}
                                                commentID={comment.id}
                                            />
                                        )}
                                    <Card.Header>
                                        {comment.username}
                                    </Card.Header>
                                    <Card.Meta>
                                        {moment(createdAt).fromNow()}
                                    </Card.Meta>
                                    <Card.Description>
                                        {comment.body}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card>
                </Grid.Column>
            </Grid>
        );
    }
    return postMarkup;
}

const POST_COMMENT_MUTATION = gql`
    mutation($postID: ID!, $body: String!) {
        createComment(postID: $postID, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

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
