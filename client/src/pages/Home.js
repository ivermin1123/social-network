import React from "react";
import { Grid } from "semantic-ui-react";
import { gql, useQuery } from "@apollo/client";
// import gql from "graphql-tag";

import PostCard from "../components/PostCard";

function Home() {
    const { loading, data, error } = useQuery(FETCH_POST_QUERY);
    if (error) return <p>ERROR: {error.message}</p>;
    console.log({ data });
    if (data === undefined) return <p>ERROR</p>;
    return (
        <Grid columns={2}>
            <Grid.Row className="page-title">
                <h1>Recent Post</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading post ...</h1>
                ) : (
                    data.getPosts &&
                    data.getPosts.map((post) => {
                        return (
                            <Grid.Column
                                key={post.id}
                                style={{ marginBottom: 20 }}
                            >
                                <PostCard post={post} />
                            </Grid.Column>
                        );
                    })
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POST_QUERY = gql`
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

export default Home;
