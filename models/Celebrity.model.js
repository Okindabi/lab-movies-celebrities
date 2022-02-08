const { Schema, model, Types } = require("mongoose");

const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchphrase: String,
});

module.exports = model("Celebrity", celebritySchema);