const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    task_title: {type: String, required: true },
    task_description: {type: String, required: true},
    assignee: {type: String, required: true},
    deadline: {type: Date, required: true},
    status: {type: String, required: true},
    priority: {type: String, required: true}
});

module.exports = mongoose.model('Task', taskSchema);