import { StatusCodes } from "http-status-codes";
// import Auth from "../models/auth.model.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.model.js";
import { getReceived, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const receiveId = req.params.id
        const senderId = req.user._id
        if (receiveId.toString() === senderId.toString()) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Tài khoản admin' });
        }
        let conversation = await Conversation.findOne({
            participants: { $all: [ senderId, receiveId ] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiveId],
            })
        }
        const newMessage = new Message({
            senderId,
            receiveId,
            message,
        })
        if (newMessage) {
            conversation.message.push(newMessage._id)
        }
        await Promise.all([conversation.save(), newMessage.save()])

        const receiveSocketId = getReceived(receiveId)
        if (receiveSocketId) {
            // Send message to the receiver
            // console.log(receiveSocketId);
            io.to(receiveSocketId).emit('newMessage', newMessage);
        }
        return res.status(StatusCodes.OK).json(newMessage);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const getMessage = async (req, res) => {
    try {
        // const User = await Auth.findOne({ isAdmin: true })
        // if (!User) {
        //     return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not admin' });
        // }
        const usertoChat = req.params.id
        // console.log(usertoChat);
        const senderId = req.user._id
        if (usertoChat === senderId) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Tài khoản admin' });  
        }
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, usertoChat ] }
        }).populate("message")
        if (!conversation) {
            return res.status(StatusCodes.OK).json([]);
        }
        return res.status(StatusCodes.OK).json(conversation.message);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}