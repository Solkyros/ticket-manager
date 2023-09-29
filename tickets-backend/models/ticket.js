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
    assignedTo: {
      type: String,
      required: [true, "Please add the user you are assigning the ticket to"],
    },
    priority: {
      type: Number,
      required: [true, "Please give a priority rating for this ticket"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);