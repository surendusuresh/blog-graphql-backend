const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  extend type Query {
    post(id: ID!): Post!
    posts: [Post!]!
    postByTitle(searchTerm: String!): [Post!]!
  }

  extend type Mutation {
    createPost(title: String!, content: String!): Post!
  }
`;
