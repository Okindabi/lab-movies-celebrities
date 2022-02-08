const { Schema, model, Types } = require("mongoose");

const moviesSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: Types.ObjectId,
        ref: "Celebrity",
    }, ],
});

module.exports = model("Movies", moviesSchema);