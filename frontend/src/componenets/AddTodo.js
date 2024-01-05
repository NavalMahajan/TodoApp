import { useContext, useState } from "react";
import TodoContext from "../context/Todos/TodoContext";
import "./AddTodo.css";
const AddTodo = () => {
  const context = useContext(TodoContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const OnchangeInput = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
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
            // onChange={OnchangeInput}
          />
        </div>

        {/* <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" />
                </div> */}
        <button type="submit" className="btn " onClick={handleAddNote}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
