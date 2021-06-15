const mongoose = require('mongoose');

const Listschema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3
    }
});

const List = mongoose.model('List', Listschema);
module.exports = List;