const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    gender: { type: String, required: true},
    mobile: { type: Number, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true, select:false}
    //confirm_password: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);