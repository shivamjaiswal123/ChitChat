import { Request, Response } from 'express';
import { Message } from '../model/message.model';

export const getMessages = async (req: Request, res: Response) => {
  const loggedinUserId = req.id;
  const queryParams = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: loggedinUserId, receiverId: queryParams.userId },
        { senderId: queryParams.userId, receiverId: loggedinUserId },
      ],
    });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
    console.error('Error in getting chat history: ', error);
  }
};
