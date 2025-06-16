import { Request, Response } from 'express';
import { User } from '../model/user.model';

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
