const mongoose = require('mongoose');
const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  //  geometry : {
        type : String,
        coordinates : [Number]
  //  }
});

module.exports = mongoose.model('Location', locationSchema);