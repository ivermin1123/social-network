import React, { useContext, useState } from "react";
import { Message, Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
function Login({ history }) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            history.push("/");
        },
        onError(err) {
            console.log(err);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className="form-container">
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
            >
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username .. "
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password .. "
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
                {Object.keys(errors).length > 0 && (
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <Message.List>
                            {Object.values(errors).map((value) => {
                                return (
                                    <Message.Item key={value}>
                                        {value}
                                    </Message.Item>
                                );
                            })}
                        </Message.List>
                    </Message>
                )}
            </Form>
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Login;
