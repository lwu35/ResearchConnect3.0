const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create schema
const ForumPostSchema = new Schema({
  
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  cruzid: String,
  created: {
    type: Date,
    default: Date.now,
  },
  text: String,
  title: String,
  tag: String,
  
  replies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'forum_post',
    },
  ],
  
});

module.exports = ForumPost = mongoose.model('forum_post', ForumPostSchema);
