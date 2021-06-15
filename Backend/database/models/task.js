const mongoose = require('mongoose');

const Taskschema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', Taskschema);

module.exports = Task;