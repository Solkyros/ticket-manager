const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      required: [true, "Please give the description of the ticket"],
    },
    type: {
      type: String,
      required: [true, "Please select the type of ticket"],
    },
    assignedTo: {
      type: String,
      required: [true, "Please add the user you are assigning the ticket to"],
    },
    priority: {
      type: Number,
      required: [true, "Please give a priority rating for this ticket"],
    },
    projectId: {
      type: String,
      required: [true, "The project id is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);