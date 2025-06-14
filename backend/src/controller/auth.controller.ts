import { Request, Response } from 'express';
import { authSchema } from '../schemas/auth.schema';
import { User } from '../model/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  const validateData = authSchema.safeParse(req.body);

  if (!validateData.success) {
    res.status(411).json({
      success: false,
      message: validateData.error.issues[0].message,
    });
    return;
  }

  const { name, email, password } = req.body;

  try {
    const hashedPass = await bcrypt.hash(password, 5);

    await User.create({
      name,
      email,
      password: hashedPass,
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
    });
  } catch (error: any) {
    // db unique constraint check
    if (error.code === 11000) {
      res
        .status(409)
        .json({ success: false, message: 'Email is already taken' });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
    console.error('Error in signup: ', error);
  }
};

export const signin = async (req: Request, res: Response) => {
  const validateData = authSchema.safeParse(req.body);

  if (!validateData.success) {
    res.status(411).json({
      success: false,
      message: validateData.error.issues[0].message,
    });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User does not exist',
      });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(401).json({
        success: false,
        message: 'Incorrect Password',
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    let options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    };

    res.status(200).cookie('token', token, options).json({
      success: true,
      message: 'User logged in successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
    console.error('Error in signin: ', error);
  }
};

export const me = async (req: Request, res: Response) => {
  const id = req.id;

  try {
    const user = await User.findById({ _id: id }).select('-password');

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
    console.error('Error in me: ', error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token').json({
    success: true,
    message: 'User logged out successfully',
  });
};
