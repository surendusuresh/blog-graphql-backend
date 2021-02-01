const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    user: async (parent, { id }, { models: { userModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const user = await userModel.findById({ _id: id }).exec();
      return user;
    },
    login: async (
      parent,
      { email, password },
      { models: { userModel } },
      info
    ) => {
      const user = await userModel.findOne({ email }).exec();

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id }, "riddlemethis", {
        expiresIn: 24 * 10 * 50,
      });

      return {
        token,
      };
    },
  },
  Mutation: {
    createUser: async (
      parent,
      { name, email, password },
      { models: { userModel } },
      info
    ) => {
      const user = await userModel.create({ name, email, password });
      return user;
    },
    editUser: async (parent, { id, input }, {models: { userModel }, me}, info ) => {      
      if(!me) {
        throw new AuthenticationError("You are not authenticated");
      }      
      let user = await userModel.findOneAndUpdate({ _id: id }, { ...input }, {new: true}) 
      if(!user){
        throw new Error("Failed to update the user")        
      }     
      return user            
    },
  },
  User: {
    posts: async ({ id }, args, { models: { postModel } }, info) => {
      const posts = await postModel.find({ author: id }).exec();
      return posts;
    },
  },
};

