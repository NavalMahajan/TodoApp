import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },

    // subTodos: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "SubTodo",
    //   },
    // ], // Array of subtodos
    color: {
      type: String,
      default: "#FFFFFF",
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
