import asyncHandler from "express-async-handler";
import Messages from "../models/messageModel";

// @desc    Create new message
// @route   POST /api/messages
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
    //get message details from request body
    const { to, message } = req.body;
    const { id } = req.user;

    //Find if both the users exist
    const userFrom = await Users.findOne({ _id: id });
    const userTo = await Users.findOne({ _id: to });

    //if both users exist then create message
    if (userFrom && userTo) {

        //create new message object using message schema
        const newMessage = await Messages({
            from: id,
            to,
            message
        })

        //save message to database and send response
        if (await newMessage.save()) {
            res.status(201).json({
                from: newMessage.from,
                to: newMessage.to,
                message: newMessage.message,
                createdAt: newMessage.createdAt
            })
        } else {
            res.status(400)
            throw new Error("Message not saved")
        }
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


// @desc    Get message by id
// @route   GET /api/messages/:id
// @access  Private
const getMessages = asyncHandler(async (req, res) => {

})

export { createMessage };