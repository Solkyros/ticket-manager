const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please give the name of the project"],
    },
    description: {
      type: String,
      required: [true, "Please give the description of the project"],
    },
    emails: {
      type: [String],
      required: [true, "Email(s) associated with the project is required"],
    },
    color: {
      type: String,
      required: [true, "The color associated with the project is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
