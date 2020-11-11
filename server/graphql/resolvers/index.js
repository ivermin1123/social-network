const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const likesResolvers = require("./likes");

module.exports = {
    Post: {
        likeCount: (post) => post.likes.length,
        commentCount: (post) => post.comments.length,
    },
    // Comment: {
    //   commentChild: (post, ha, hi) => {
    //     console.log(hi);
    //     return hi.getCommentChild(post.id);
    //   },
    // },
    Query: {
        ...postsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation,
    },
};
