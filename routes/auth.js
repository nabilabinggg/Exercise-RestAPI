const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const verifyToken = require('../routes/verifyToken')

//import models & validation
const {User,validateUser} = require('../models/user')


// Register

router.post('/register', async (req,res) => {
    // if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email sudah digunakan !'
    })

    // Hash Pass
    const salt = await bcrypt.genSalt(10)
    const hashPassword  = await bcrypt.hash(req.body.password, salt)

    const error = await validateUser(req.body);

    if (error.message) res.status(400).send(error.message);

    user = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: hashPassword
    })

    user
      .save()
      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        res.status(500).send("Gagal membuat user baru");
      });

})

// login
router.post('/login', async (req,res) => {
    // if email exist
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({
        status: res.statusCode,
        message: 'Email anda salah !'
    })

    // check password
    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if(!validPwd) return res.status(400).json({
        status: res.statusCode,
        message: 'Password anda salah !'
    })

    // membuat token menggunakan jwt
    const token = jwt.sign({ _id: user._id}, process.env.SECRET_KEY)
    res.header('auth-token', token).json({
        token: token
    })

})

//GET ALL DATA COWORKING
router.get("/", (req, res) => {
    User.find()
    .then((users) => res.send(users))
    .catch((error) => {
      res.status(500).send("Something went Wrong!");
    });
});

//GET DATA COWORKING BY ID
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if(!user) res.status(404).send("user not found")
  res.send(user)
});

module.exports = router;