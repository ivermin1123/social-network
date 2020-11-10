import React, { useContext } from "react";
import { Grid, Transition } from "semantic-ui-react";
import { gql, useQuery } from "@apollo/client";
// import gql from "graphql-tag";

import { FETCH_POST_QUERY } from "../utils/graphql";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function Home() {
    const { user } = useContext(AuthContext);
    const { loading, data, error } = useQuery(FETCH_POST_QUERY);
    // if (error) return <p>ERROR: {error.message}</p>;
    // console.log({ data });
    // if (data === undefined) return <p>ERROR</p>;
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Post</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading post ...</h1>
                ) : (
                    <Transition.Group>
                        {data.getPosts &&
                            data.getPosts.map((post) => {
                                return (
                                    <Grid.Column
                                        key={post.id}
                                        style={{ marginBottom: 20 }}
                                    >
                                        <PostCard post={post} />
                                    </Grid.Column>
                                );
                            })}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Home;
