const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yardSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
  rate: Number,
  fence: Boolean,
  water: Boolean,
  hasPets: Boolean,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Yard = mongoose.model("Yard", yardSchema);

module.exports = Yard;
