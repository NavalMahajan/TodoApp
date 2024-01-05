import { useContext, useEffect } from "react";
import TodoContext from "../context/Todos/TodoContext";
// import Noteitem from './Noteitem';
import AddTodo from "./AddTodo.js";
import Todoitem from "./TodoItems.js";
import "./Todo.css";
// import { useLocation } from 'react-router-dom';
let todosArray;
const Todos = () => {
  const context = useContext(TodoContext);
  // const location = useLocation();
  const { Todos, fetchTodo } = context;
  useEffect(() => {
    fetchTodo();
    // todosArray = Object.values(Todos);
    // console.log(Todos);
  }, []);
  // console.log(todosArray);

  return (
    <>
      <AddTodo />
      <div className="todos">
        <h3>My Todos</h3>
        {/* <Todoitem key={Todos._id} Todos={Todos} /> */}

        {Todos.map((Todo) => {
          console.log(Todo._id, "yooo");
          return <Todoitem key={Todo._id} todo={Todo} />;
        })}
      </div>
    </>
  );
};

export default Todos;
