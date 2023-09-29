const express = require("express");
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket-controller");
const validateToken = require("../middleware/validate-token-handler");

router.use(validateToken);
router.route("/").get(getTickets).post(createTicket);
router.route("/:id").get(getTicket).put(updateTicket).delete(deleteTicket);


module.exports = router;
