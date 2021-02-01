const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const dotenv = require("dotenv");

dotenv.config();

const schemas = require("./schemas/index");
const resolvers = require("./resolvers/index");

const userModel = require("./models/userModel");
const postModel = require("./models/postModel");

const app = express();
app.use(cors());

const getUser = async (req) => {
  const token = req.headers["token"];

  if (token) {
    try {
      return await jwt.verify(token, "riddlemethis");
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  playground: process.env.NODE_ENV === 'production' ? false : true,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
        me,
        models: {
          userModel,
          postModel,
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: true,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
});
