const express = require("express");
const router = express.Router();
const {
  getTickets,
  getProjectTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket-controller");
// const cors = require("cors");
const validateToken = require("../../middleware/validate-token-handler");
// const port = process.env.PORT || 3001;
// router.use(
//   cors({
//     credentials: true,
//     origin: port,
//   })
// );
router.use(validateToken);
router.route("/").get(getTickets).post(createTicket);
router.route("/project/:id").get(getProjectTickets);
router.route("/ticket/:id").get(getTicket).put(updateTicket).delete(deleteTicket);


module.exports = router;
