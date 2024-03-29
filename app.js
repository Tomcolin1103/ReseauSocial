const express = require("express");
const path = require("path");
const router = require("./routers/router.js");

// Import sessions
const sessions = require('client-sessions');

const PORT = 8002;
const app = express();

// Dis a express de l'utiliser
app.use(sessions({
    cookieName: 'session',
    secret: 'taclésecrète',
    duration: 3600000, // 1h en ms
    activeDuration: 3600000 // 1h en ms -> Si expiresIn du token < activeDuration la session sera étendue jusqu'a l'activeDuration
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(PORT, () => {});
