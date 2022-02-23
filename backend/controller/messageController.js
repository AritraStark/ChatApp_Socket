import asyncHandler from "express-async-handler";
import Messages from "../models/messageModel.js";
import Users from "../models/userModel.js";

// @desc    Create new message
// @route   POST /api/messages/:id
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
    //get message details from request body
    const { message } = req.body;
    const { id } = req.user;
    const to = req.params.id;

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
        throw new Error("Users not found")
    }
})


// @desc    Get message by id
// @route   GET /api/messages/:id
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;


    //Find if both the users exist
    const userFrom = await Users.findOne({ _id: userId });
    const userTo = await Users.findOne({ _id: id });

    //if both users exist then get messages
    if (userFrom && userTo) {
        //get messages from database
        const messages = await Messages.find({ to: [userId, id], from: [id, userId] })
            .sort({ createdAt: 1 })

        //send response
        res.status(200).json(messages)

    } else {
        res.status(404)
        throw new Error("Users not found")
    }
})

export { createMessage, getMessages };