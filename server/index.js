const express = require('express');
const projectRoutes = require('./routes/project-routes');
const ticketRoutes = require('./routes/ticket-routes');
const userRoutes = require('./routes/user-routes');
const errorHandler = require('./middleware/error-handler');
const connectDb = require("./config/connection")
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
connectDb();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
// app.use(cors({
//   credentials: true,
//   origin: port
// }));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/api/projects', projectRoutes); //to use the project routes
app.use('/api/tickets', ticketRoutes); //to use the ticket routes
app.use('/api/users', userRoutes); //to use the user routes

app.use(errorHandler);
app.listen(port, () =>{
  console.log(`Listening on port ${port}!`);
});