const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },  
});

postSchema.plugin(timestamps);

postSchema.index({ createdAt: 1, updatedAt: 1 });

const post = mongoose.model('post', postSchema);

module.exports = post;