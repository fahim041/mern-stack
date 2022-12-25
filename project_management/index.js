const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const schema = require("./schema/schema");
const connectDB = require("./config/db");

const port = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(cors());

app.get("/", (req, res) => {
  res.send({"message":"Hello world"})
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV == "development",
  })
);

app.listen(port, () => console.log(`server running on ${port}`));
