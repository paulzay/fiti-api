const express = require('express');
const router = require("./routes/index.js");
const Database = require('./utils/mongodb.js');


require('dotenv').config();

const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});

Database.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', router);

module.exports = app;
