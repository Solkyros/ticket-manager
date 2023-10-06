const Ticket = require("../../models/ticket");
const asyncHanlder = require("express-async-handler");

// @desc Get all tickets for user
// @route GET /api/tickets/
const getTickets = asyncHanlder(async (req, res) => {
  const tickets = await Ticket.find({ assignedTo: req.user.email });
  res.status(200).json(tickets);
});

// @desc Get all tickets for project
// @route GET /api/tickets/project/:id
const getProjectTickets = asyncHanlder(async (req, res) => {
  const tickets = await Ticket.find({ projectId: req.params.id });
  res.status(200).json(tickets);
});

// @desc Get specific ticket
// @route GET /api/tickets/ticket/:id
const getTicket = asyncHanlder(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  res.status(200).json(ticket);
});

// @desc Create new ticket
// @route POST /api/tickets/
const createTicket = asyncHanlder(async (req, res) => {
  const { description, type, assignedTo, priority, projectId } = req.body;
  if (!description || !type || !assignedTo || !priority || !projectId) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  const ticket = await Ticket.create({
    description,
    type,
    assignedTo,
    priority,
    projectId,
    user_id: req.user.id,
  });

  res.status(201).json(ticket);
});

// @desc Update existing ticket
// @route PUT /api/tickets/:id
const updateTicket = asyncHanlder(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  console.log(ticket)
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
// Users can update user tickets
  // if (ticket.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other user tickets");
  // }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

// @desc Delete existing ticket
// @route DELETE /api/tickets/:id
const deleteTicket = asyncHanlder(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user tickets");
  }
  await Ticket.deleteOne({ _id: req.params.id });
  res.status(200).json(ticket);
  res.status(200).json({
    message: `Deleted ticket ${req.params.id}`,
  });
});
module.exports = {
  getTickets,
  getProjectTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
