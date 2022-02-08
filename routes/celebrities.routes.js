// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/celebrities/create", (req, res, next) => {
    console.log("here is the req", req.body);
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchphrase: req.body.catchphrase,
    }).then((newCeleb) => {
        console.log("new celeb", newCeleb);
        res.redirect("/");
    });
});

router.get("/celebrities", (req, res, next) => {
    Celebrity.find().then((allCelebs) => {
        res.render("celebrities/celebrities", { celebrities: allCelebs });
    });
});

module.exports = router;