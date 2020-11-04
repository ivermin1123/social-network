const Post = require("../../models/Post");
const { UserInputError, AuthenticationError } = require("apollo-server");
const checkAuth = require("../../utils/check-auth");

module.exports = {
    Mutation: {
        createComment: async (_, { postID, body }, context) => {
            const { username } = checkAuth(context);
            if (body.trim() === "") {
                throw new UserInputError("Empty comment", {
                    errors: {
                        body: "Comment body must not be empty",
                    },
                });
            }

            const post = await Post.findById(postID);
            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString(),
                });
                await post.save();
                return post;
            } else throw new UserInputError("Post not found");
        },
        createCommentChild: async (
            _,
            { postID, commentFatherID, body },
            context
        ) => {
            const { username } = checkAuth(context);
            if (body.trim() === "") {
                throw new UserInputError("Empty comment", {
                    errors: {
                        body: "Comment body must not be empty",
                    },
                });
            }

            const isLargeNumber = (element, index, array) => {
                let IDhere = this.commentFatherID;
                console.log("element", element);
                console.log("index", index);
                console.log("array", array);
                console.log("IDhere", IDhere);
                return element.id === this.commentFatherID;
            };
            //  element.id === commentFatherID;
            const post = await Post.findById(postID);
            const commentFather = await post.comments.indexOf(isLargeNumber);
            console.log("commentFather", commentFather);
            if (commentFather !== -1) {
                post.comments[commentFather].commentChild.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString(),
                });
                await post.save();
                return post;
            } else throw new UserInputError("Post not found");
        },
        deleteComment: async (_, { postID, commentID }, context) => {
            const { username } = checkAuth(context);
            const post = await Post.findById(postID);
            if (post) {
                const commentIndex = post.comments.findIndex(
                    (c) => c.id === commentID
                );
                if (!post.comments[commentIndex]) {
                    throw new AuthenticationError("Comment not found.");
                }
                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError("Action not allowed.");
                }
            } else throw new UserInputError("Post not found.");
        },
    },
};
