const express = require('express');
const ticketRoutes = require('./routes/ticket-routes');
const userRoutes = require('./routes/user-routes');
const errorHandler = require('./middleware/error-handler');
const connectDb = require("./config/connection")
require('dotenv').config()
connectDb();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/tickets', ticketRoutes); //to use the ticket routes
app.use('/api/users', userRoutes); //to use the user routes

app.use(errorHandler);
app.listen(port, () =>{
  console.log(`Listening on port ${port}!`);
});