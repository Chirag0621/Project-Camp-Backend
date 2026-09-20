import mongoose, { Schema } from 'mongoose'

const subtaskSchema = new Schema({
  title:{
    type: String,
    required: true,
    trim: true
  },
  task: {
    type: Schema.Types.ObjectId,
    ref:"Task",
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
}, {timestamps: true})

subtaskSchema.pre("save", function(next) {
  if (this.createdBy && !this.createBy) {
    this.createBy = this.createdBy;
  } else if (this.createBy && !this.createdBy) {
    this.createdBy = this.createBy;
  }
  next();
});


export const Subtask = mongoose.model("Subtask", subtaskSchema)