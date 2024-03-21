const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
const upload = require('express-fileupload')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes');
const { notFound, errorMiddleware } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(upload())
app.use('/uploads' , express.static(__dirname + '/uploads'))  // Static route for the

app.use('/api/users' , userRoutes)
app.use('/api/posts' , postRoutes)

app.use(notFound)
app.use(errorMiddleware)

connect(process.env.MONGO_URL)
  .then(
    app.listen(process.env.PORT || 5000, () =>
      console.log(
        `Server running on port ${process.env.PORT} /n Connected successfully to database.`
      )
    )
  )
  .catch((err) => console.error(err));
