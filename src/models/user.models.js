import mongoose, { Schema } from 'mongoose'
import bcrypt from "bcrypt"


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
export const user = mongoose.model('User', userSchema);
