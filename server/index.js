const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const {createMessage} = require("./controllers/ctrl.js")

app.post("/api/messages", createMessage);

app.listen(4004, () => {
    console.log("Running on 4004");
})