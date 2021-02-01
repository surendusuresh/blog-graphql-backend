const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    post: async (parent, { id }, { models: { postModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const post = await postModel.findById({ _id: id }).exec();
      return post;
    }, 
    allPosts: async (parent, args, { models: { postModel } }, info) => {
      const posts = await postModel.find().exec();
      return posts;
    },
    postByTitle: async (parent, { searchTerm }, { models: {postModel }, me}, info) => {
      if(!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const posts = await postModel.find({ title: { "$regex": searchTerm, "$options": "i" } }).exec();
      return posts;
    }
  },
  Mutation: {
    createPost: async (
      parent,
      { title, body, slug, tags, image },
      { models: { postModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const post = await postModel.create({ title, body, slug, tags, image , author: me.id });      
      return post;
    },
    editPost: async (parent, { _id, input }, {models: {postModel }, me}, info ) => {      
      if(!me) {
        throw new AuthenticationError("You are not authenticated");
      }      
      let post = await postModel.findOneAndUpdate({ _id, author:me.id}, { ...input }, {new: true}) 
      if(!post){
        throw new Error("Failed to update the document")        
      }     
      return post            
    },
    deletePost: async (parent, { _id }, {models: { postModel }, me}, info) => {
      if(!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      if(await postModel.findByIdAndDelete(_id)){
        return { "status": "success"}
      }
      throw new Error("Something went wrong")
    }
  },
  Post: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    },
  },
};
