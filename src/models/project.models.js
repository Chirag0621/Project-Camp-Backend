import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,

  },
  description:{
    type: String,
  },
  createdBy: {
    typeof: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

} , {timestamps: true})

export const project = moongoose.model("Project", projectSchema);