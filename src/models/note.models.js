import mongoose, { Schema } from "mongoose";
const projectNoteSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
const ProjectNote = mongoose.model("ProjectNote", projectNoteSchema);
export default ProjectNote;
