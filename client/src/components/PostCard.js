import React from "react";
import { Card, Icon, Image, Button, Label } from "semantic-ui-react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PostCard({post: { id, body, createdAt, username, likeCount, commentCount }}) {
    const likePost = () => {

    };

    const commentOnPost = () => {

    };
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
                    <span className="date">{moment(createdAt).fromNow(true)}</span>
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='teal'>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commentOnPost}>
                    <Button color='blue'>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
}

PostCard.propTypes = {
    post:  PropTypes.object.isRequired,
    likes: PropTypes.object,
    comments: PropTypes.object
};


export default PostCard;
