const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    slug: String!
    tags: String!
    image: String
    author: User!
  }
  
  type Status {
    status: String!
  }

  input PostInput {
    title: String!
    body: String!
    slug: String!
    tags: String!
    image: String
  }

  extend type Query {
    post(id: ID!): Post
    myPosts: [Post!]
    allPosts: [Post!]
    postByTitle(searchTerm: String!): [Post!]    
  }

  extend type Mutation {
    createPost(title: String!, body: String!, slug: String!, tags: String!, image: String): Post!
    editPost(_id: ID!, input: PostInput): Post!
    deletePost(_id:ID!): Status!
  }
`;
