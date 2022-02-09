import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const Messages = mongoose.model('Messages', messageSchema)
export default Messages