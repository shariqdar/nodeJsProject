const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const citySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    country: { type: String, required: true}
})
module.exports = mongoose.model('City', citySchema);