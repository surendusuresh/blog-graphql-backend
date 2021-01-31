const userSchema = require('./userSchema');
const postSchema = require('./postSchema');
const { gql } = require('apollo-server');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [ linkSchema, userSchema, postSchema ];