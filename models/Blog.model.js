const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Title is required.']
    },
    content: {
        type: String,
        required: [true,'Content is required.']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Blog', BlogSchema);

