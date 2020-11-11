import React, { useContext } from "react";
import { Card, Icon, Image, Button, Label, Popup } from "semantic-ui-react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function PostCard({
    post: { id, body, createdAt, username, likes, likeCount, commentCount },
}) {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Image
                src="/images/avatar/avatar_cat_cute.jpg"
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    <span className="date">
                        {moment(createdAt).fromNow(true)}
                    </span>
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Popup
                    content="Comment on post"
                    inverted
                    trigger={
                        <Button
                            labelPosition="right"
                            as={Link}
                            to={`/posts/${id}`}
                        >
                            <Button color="blue">
                                <Icon name="comments" />
                            </Button>
                            <Label basic color="blue" pointing="left">
                                {commentCount}
                            </Label>
                        </Button>
                    }
                />

                {user && user.username === username && (
                    <DeleteButton postID={id} />
                )}
            </Card.Content>
        </Card>
    );
}

export default PostCard;
