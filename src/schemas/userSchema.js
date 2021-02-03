const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    location: String!
    company: String!
    description: String
    posts: [Post!]!
  }

  type Token {
    token: String!
  }
  
  input UserInput {
    name: String    
    password: String
  }

  extend type Query {
    user(id: ID!): User!
    login(email: String!, password: String!): Token!
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!, description: String, location: String!, company: String!): User!
    editUser(id:ID!, input: UserInput): User!
  }
`;

