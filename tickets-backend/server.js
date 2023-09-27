const express = require('express');
const routes = require('./routes/ticket-routes'); // import the routes
const errorHandler = require('./middleware/error-handler');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/tickets', routes); //to use the routes
app.use(errorHandler);
app.listen(port, () =>{
  console.log(`Listening on port ${port}!`);
});