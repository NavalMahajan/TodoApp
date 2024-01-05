import { useContext, useState } from "react";
import TodoContext from "../context/Todos/TodoContext";
import "./AddTodo.css";
const AddTodo = () => {
  const context = useContext(TodoContext);
  const { Todos, addTodo } = context;
  const [val, setval] = useState("");
  // const [Todos, addTodo] = useState({
  //   context: ""
  // });
  const handleAddNote = (e) => {
    e.preventDefault();
    addTodo(val, "blackk");
  };
  const OnchangeInput = (e) => {
    setval(e.target.value);
  };
  return (
    <div className="todos">
      <h3>Add a Note</h3>
      <form>
        <div className="todoContent">
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={val}
            onChange={OnchangeInput}
          />
        </div>
        <button type="submit" className="btn " onClick={handleAddNote}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
