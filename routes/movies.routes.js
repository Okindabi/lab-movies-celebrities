// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here
router.get("/movies/create", (req, res) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render("movies/new-movie", { celebrities });
        })
        .catch((err) => {
            console.log("there was an error: ", err);
        });
});

router.post("/movies/create", (req, res) => {
    console.log("here is the req.body: ", req.body);
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }).then((newMovie) => {
        console.log("newMovie was created: ", newMovie);
        res.redirect("/movies");
    });
});

router.get("/movies", (req, res) => {
    Movie.find().then((allMovies) => {
        res.render("movies/movies", { movies: allMovies });
    });
});

router.get("/movies/:id", (req, res) => {
    Movie.findById(req.params.id)
        .populate("cast")
        .then((results) => {
            console.log(results);
            res.render("movies/movie-details", results);
        });
});

router.post("/movies/:id/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/movies");
    });
});

router.get("/movies/:id/edit", (req, res) => {
    Movie.findById(req.params.id).then((results) => {
        Celebrity.find().then((celebrities) => {
            res.render("movies/edit-movie", { celebrities, results });
        });
    });
});
router.post("/movies/:id/edit", (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }).then((results) => {
        res.redirect("/movies");
    });
});

module.exports = router;