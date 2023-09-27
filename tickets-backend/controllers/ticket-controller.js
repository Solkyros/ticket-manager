const asyncHanlder = require('express-async-handler');

// @desc Get all tickets
// @route GET /api/tickets/
const getTickets = asyncHanlder(async(req, res) => {
  res.status(200).json({
    message: "Get tickets",
  });
});

// @desc Get specific ticket
// @route GET /api/tickets/:id
const getTicket = asyncHanlder(async(req, res) => {
  res.status(200).json({
    message: `Get ticket ${req.params.id}`,
  });
});

// @desc Create new ticket
// @route POST /api/tickets/
const createTicket = asyncHanlder(async(req, res) => {
    const {description, assignedTo, priority} = req.body;
    if (!description|| !assignedTo|| !priority) {
        res.status(400);
        throw new Error('Please fill in all required fields');
      }
  res.status(200).json({
    message: "Created new ticket",
  });
});

// @desc Update existing ticket
// @route PUT /api/tickets/:id
const updateTicket = asyncHanlder(async(req, res) => {
  res.status(200).json({
    message: `Updated ticket ${req.params.id}`,
  });
});

// @desc Delete existing ticket
// @route DELETE /api/tickets/:id
const deleteTicket = asyncHanlder(async(req, res) => {
  res.status(200).json({
    message: `Deleted ticket ${req.params.id}`,
  });
});
module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
