import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import errorProvider from '../utils/errorProvider.js';

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return next(errorProvider(400, 'Email already exists'));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json('User created successfully');
  } catch (error) {
    console.log('Error occurred while creating a user, ' + error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (validUser) {
      let validPassword = await bcryptjs.compare(password, validUser.password);

      if (validPassword) {
        let tokenPayload = { id: validUser._id };
        if (validUser._doc.admin) {
          tokenPayload.admin = true;
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access-token', token, { httpOnly: true })
          .status(201)
          .json(rest);
      } else {
        next(errorProvider(404, 'Wrong credentials'));
      }
    } else {
      next(errorProvider(404, 'User not found'));
    }
  } catch (error) {
    next(error);
  }
};