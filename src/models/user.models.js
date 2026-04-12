import mongoose, { Schema } from 'mongoose'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import crypto from "crypto";

const userSchema = new Schema(
  {
    avatar:{
      type:{
        url: String,
        localPath: String,

      },
      default: {
        url: `https://placehold.co/200x200`,
        localPath: "",
      }
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, 
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, 

    },
    fullName: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },

    refreshToken : {
      type: String
    },

    forgotPasswordToken: {
      type: string
    },
    forgotPasswordExpiry: {
      type: Date
    },
    emailVerificationToken: {
      type: String
    },
    emailVerificationExpiry: {
      type: Date
    }
  },
  {
    timestamps: true // we will get two fields createat and updatedat by using this 
  }

);


// hooks 
userSchema.pre("save", async function(next){
  // in Ismodified we check the things which are being modified in this particular save
  if(!this.isModified(this.password)) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


//Method
userSchema.methods.isPasswordCorrect = async function
(password){
  return await bcrypt.compare(password, this.password) // returns true if the password is correct 
  // Password checking is done using hashing as if you are giving the correct password the hashing is same to the saved one...
}
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(

    // These first information is called payload 
    {
      _id: this._id,
      email: this.email,
      username: this.username,

    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
  )
}
userSchema.methods.generateRefreshToken = function(){

  //Payload
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )
}

userSchema.methods.generateTemporaryToken = function(){
  //Generating long random string 
  const unhashedToken = crypto.randomBytes(20).toString("hex")

  // Encypting the string
  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex")
  
  
  const tokenExpiry = Date.now + (20*60*1000) // Adding 20 minutes
  //sending it back
  return {unhashedToken, hashedToken, tokenExpiry}
}


export const user = mongoose.model('User', userSchema);
