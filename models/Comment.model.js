const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true,'Comment is required.']
    },
    OwnerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
},{
    timestamps: true,
})

module.exports = model('Comment', CommentSchema);

