import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Todo } from "../models/todoModel.js";
import { ApiResponse } from "../utils/apiRes.js";

const addtodo = asynchandler(async (req, res) => {
  const { content, complete, color } = req.body;

  if (content?.trim() === "") {
    throw new ApiError(400, "Content is empty");
  }
  const todo = await Todo.create({
    content,
    complete,
    createdBy: req.user._id,
    color,
  });

  if (!todo) {
    throw new ApiError(500, "Something went wrong while adding todo");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, todo, "Todo is added successfully"));
});

const fetchtodo = asynchandler(async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user.id });
  if (!todos) {
    throw new ApiError(400, "You don't have todos, please create one");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, todos, "Todo's are fetched successfully"));
});

const deletetodo = asynchandler(async (req, res) => {
  const id = req.params.id;
  try {
    // Find the todo to check if it exists and belongs to the authenticated user
    const todo = await Todo.findOne({ _id: id, createdBy: req.user.id });

    if (!todo) {
      // If the todo doesn't exist or doesn't belong to the user, return an error
      throw new ApiError(400, "Unauthorized request or Todo not found");
    }

    // If the todo exists and belongs to the user, delete it
    const deletedTodo = await Todo.findByIdAndDelete(id);

    // Respond with a success message or the deleted todo
    return res
      .status(200)
      .json(new ApiResponse(200, deletedTodo, "Todo deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
});
const updateTodo = asynchandler(async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({ _id: id, createdBy: req.user.id });
    if (!todo) {
      // If the todo doesn't exist or doesn't belong to the user, return an error
      throw new ApiError(400, "Unauthorized request or Todo not found");
    }
    const { content, complete, color } = req.body;
    if (content?.trim() === "") {
      throw new ApiError(400, "Content is empty");
    }
    const updated = await Todo.findByIdAndUpdate(
      id,
      {
        $set: { content, complete, color },
      },
      { new: true }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, updated, "Todo is updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

export { fetchtodo, addtodo, deletetodo, updateTodo };
