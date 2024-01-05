// import { useContext } from 'react'
// import TodoContext from '../context/Todos/TodoContext';
import "./Todoitem.css";
import TodoContext from "../context/Todos/TodoContext";
import "./Todoitem.css";
import { useContext, useState } from "react";
const Todoitem = (props) => {
  const context = useContext(TodoContext);
  const { deleteTodo, editTodo } = context;
  const Todo = props.todo;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(Todo.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    // Perform the update logic, for example, call an editTodo function
    // Pass the updatedContent and Todo._id to the function
    // After successfully updating, set isEditing to false
    editTodo(Todo._id, updatedContent);
    setIsEditing(false);
  };
  const handleDeleteClick = () => {
    deleteTodo(Todo._id);
  };

  return (
    <>
      <div className="todo-card">
        <div className="card-body">
          {isEditing ? (
            <>
              <input
                className="editable"
                style={{
                  color: "black",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  height: "45px",
                  width: "98%",
                }}
                type="text"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
              <button
                type="submit"
                onClick={handleUpdateClick}
                className="btn3"
              >
                Update
              </button>
            </>
          ) : (
            <>
              <p className="card-title">{Todo.content}</p>
              <button
                type="submit"
                onClick={handleDeleteClick}
                className="btn2"
              >
                Delete
              </button>
              <button type="submit" onClick={handleEditClick} className="btn3">
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Todoitem;
