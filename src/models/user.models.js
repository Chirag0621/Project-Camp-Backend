import mongoose, { Schema } from 'mongoose';

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

export const user = mongoose.model('User', userSchema);
