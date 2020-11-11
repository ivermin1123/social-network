import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
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
} from "semantic-ui-react";
import moment from "moment";

import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

function SinglePost(props) {
    const postID = props.match.params.postID;
    const { user } = useContext(AuthContext);

    const { loading, data, error } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postID,
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
            <Grid columns={1} style={{ maxWidth: 500, margin: "auto" }}>
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
                        <CommentGroup
                            style={{ marginLeft: 20, marginBottom: 10 }}
                        >
                            <Header as="h3" dividing>
                                Comments
                            </Header>
                            {comments.map((comment) => (
                                <Comment key={comment.id}>
                                    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                                    <Comment.Content>
                                        <Comment.Author as="a">
                                            {comment.username}
                                        </Comment.Author>
                                        <Comment.Metadata>
                                            <div>
                                                {moment(createdAt).fromNow()}
                                            </div>
                                        </Comment.Metadata>
                                        <Comment.Text>
                                            {comment.body}
                                        </Comment.Text>
                                        <Comment.Actions>
                                            <Comment.Action>
                                                Reply
                                            </Comment.Action>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>
                            ))}
                        </CommentGroup>
                    </Card>
                </Grid.Column>
            </Grid>
        );
    }
    return postMarkup;
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
