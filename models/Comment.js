const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: { type: String, required: true },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  yard_id: {
    type: Schema.Types.ObjectId,
    ref: "Yard",
  },
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
