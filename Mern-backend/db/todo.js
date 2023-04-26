const mongoose = require('mongoose');

const todo = new mongoose.Schema({
    title:String,
    description:String,
    status:String,
    userId:String,
    due_date:String
});

module.exports = mongoose.model("todo" , todo)