const {UserModel} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const registerUser = async(req, res) => {
      try{
        const {name, email, gender, password} = req.body

        let user = await UserModel.findOne({ email });
        if(user){
            return res.status(400).json({ message : 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new UserModel({
            name,
            email,
            gender,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message : 'User registered successfully'})
      }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  module.exports = {
     registerUser, loginUser
  }