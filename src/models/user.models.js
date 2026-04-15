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
      type: String
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
userSchema.pre("save", async function(next) {
  // Check whether password field is modified or not
  if (!this.isModified("password")) return next();

  // Hash only plain text passwords. If a bcrypt hash already exists, preserve it.
  if (this.password && !this.password.startsWith("$2")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});


//Method
userSchema.methods.isPasswordCorrect = async function(password) {
  if (!password || !this.password) return false;

  try {
    const isMatch = await bcrypt.compare(password, this.password);
    if (isMatch) return true;
  } catch (err) {
    // bcrypt.compare may fail if the stored password is not a valid hash.
  }

  // If the stored password is plain text, migrate it to a bcrypt hash on first successful login.
  if (password === this.password) {
    this.password = await bcrypt.hash(password, 10);
    await this.save({ validateBeforeSave: false });
    return true;
  }

  return false;
};
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


export const User = mongoose.model('User', userSchema);
