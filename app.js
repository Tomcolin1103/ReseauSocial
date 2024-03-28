const express = require("express");
const path = require("path");
const router = require("./routers/router.js");

const PORT = 8001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(PORT, () => {});
