import { Request, Response } from 'express';
import { User } from '../model/user.model';
import { Message } from '../model/message.model';
import mongoose from 'mongoose';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const loggedinUser = req.id;
    const users = await User.find({ _id: { $ne: loggedinUser } }).select(
      '-password'
    );

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
    console.error('Error in getting users: ', error);
  }
};

export const getChattedUsers = async (req: Request, res: Response) => {
  const currUser = req.id;

  try {
    const chats = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: new mongoose.Types.ObjectId(currUser) },
            { receiverId: new mongoose.Types.ObjectId(currUser) },
          ],
        },
      },
      {
        $addFields: {
          chatId: {
            $cond: [
              { $gt: ['$senderId', '$receiverId'] },
              {
                $concat: [
                  { $toString: '$senderId' },
                  '_',
                  { $toString: '$receiverId' },
                ],
              },
              {
                $concat: [
                  { $toString: '$receiverId' },
                  '_',
                  { $toString: '$senderId' },
                ],
              },
            ],
          },
        },
      },
      { $sort: { _id: -1 } }, // sort messages by most recent
      {
        $group: {
          _id: '$chatId',
          lastMessage: { $first: '$$ROOT' },
        },
      },
      {
        $addFields: {
          chatUserId: {
            $cond: [
              {
                $eq: [
                  '$lastMessage.senderId',
                  new mongoose.Types.ObjectId(currUser),
                ],
              },
              '$lastMessage.receiverId',
              '$lastMessage.senderId',
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'chatUserId',
          foreignField: '_id',
          as: 'chatUser',
        },
      },
      { $unwind: '$chatUser' },
      {
        $project: {
          _id: '$chatUser._id',
          name: '$chatUser.name',
          lastMessage: '$lastMessage.content',
        },
      },
      {
        $sort: {
          'lastMessage._id': -1,
        },
      },
    ]);

    res.json({
      success: true,
      data: chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
    console.error('Error in getting chatted users: ', error);
  }
};
