import mongoose, { Schema } from "mongoose";
import { AvailableTaskStatus, TaskStatusEnum } from "../utils/constants";
const taskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: AvailableTaskStatus,
      default: TaskStatusEnum.TODO,
    },
    attachments: {
      type: [
        {
          url: String,
          mimetype: String,
          size: Number,
        },
      ],
      default: [],
    },
  },

  {
    timestamps: true,
  },
);
const Task = mongoose.model("Task", taskSchema);
export default Task;
