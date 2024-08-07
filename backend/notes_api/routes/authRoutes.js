const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');


const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
    });

    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    const username = user.username;
    const errorMsg = 'Auth failed email or password is incorrect'
    if(!user){
        return res.status(403)
        .json({message:"User does not exists",success:false})
    }
    const isPassEqual = await bcrypt.compare(password,user.password);
    if (!isPassEqual){
        return res.status(403)
        .json({message:errorMsg,success:false})
    }
    const jwtToken = jwt.sign(
        {email: user.email, _id :user._id},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )


    res.status(200)
        .json({
            message:"Login Success",
            success:true,
            jwtToken,
            email,
            username
        })
}catch(err){
    res.status(500)
        .json({
            message:"Internal Server Error",
            success:false
        })
}
})

// Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    // Redirect to your frontend with the token in the query params
    res.redirect(`http://localhost:3000/signin`);
  }
);


router.get('/', (req, res) => {
  res.send(`Hello ${req.user ? req.user.displayName : 'Guest'}`);
});

module.exports = router;
