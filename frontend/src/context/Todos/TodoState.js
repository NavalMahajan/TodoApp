import { useState } from "react";
import TodoContext from "./TodoContext";
import axios from "axios";

const TodoState = (props) => {
  // const host = "http://localhost:4000/api/v2/todos";
  const TodosInitial = [];
  const [Todos, setTodos] = useState(TodosInitial);
  // Fetch all Todos
  const fetchTodo = async () => {
    // const accessToken = document.cookie.split('; ')
    // console.log(accessToken)
    await axios
      .get(`http://localhost:4000/api/v1/users/fetchTodos`, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data, "hiii");
        setTodos(response.data.data);
      })
      .catch((error) => {
        console.error("Couldnot fetch", error);
      });
    // console.log(res);
  };
  // const fetchTodo = async () => {
  // API Call
  // const response = await fetch(${host}/api/v1/todos/fetchallTodos, {
  //     method: "GET",
  //     headers: {
  //         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxYzVmZjFmYzM4ZGFiMGMyZTQ2Mjk2In0sImlhdCI6MTY5NjM1ODM4NX0.yN0PvvafcOhTbUKUHFruoOVxmBhv1WeJSvmwOkl9kKw"
  //     }
  // });
  // const json = await response.json();
  // // console.log(json);
  // setTodos(json);
  // }
  // Add a Note
  const addTodo = async (id, content, complete) => {
    // To do : API Call
    // API Call

    const response = await fetch(`http://localhost:4000/api/v1/users/addTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxYzVmZjFmYzM4ZGFiMGMyZTQ2Mjk2In0sImlhdCI6MTY5NjM1ODM4NX0.yN0PvvafcOhTbUKUHFruoOVxmBhv1WeJSvmwOkl9kKw",
      },
      body: JSON.stringify({ content, complete }),
    });

    // Logic for edit note
    const Todo = {
      _id: id,
      user: "651c5ff1fc38dab0c2e46296",
      content: content,
      complete: complete,
      createdBy: "user",
      date: "2023-11-28T10:55:00.548Z",
      __v: 0,
    };
    // setNotes(notes.push(note));
    setTodos(Todos.concat(Todo));
  };
  // Delete a Note
  const deleteTodo = async (id) => {
    // console.log("delete node with"+id);
    const response = await fetch(
      `http://localhost:4000/api/v1/users/deleteTodo/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxYzVmZjFmYzM4ZGFiMGMyZTQ2Mjk2In0sImlhdCI6MTY5NjM1ODM4NX0.yN0PvvafcOhTbUKUHFruoOVxmBhv1WeJSvmwOkl9kKw",
        },
      }
    );
    const json = response.json();
    console.log(json);
    const newTodo = Todos.filter((Todo) => {
      return Todo._id !== id;
    });
    // setNotes(newNote);
    setTodos(newTodo);
  };
  // Edit a Note
  const editTodo = async (id, content, complete) => {
    // API Call
    const response = await fetch(
      `http://localhost:4000/api/v1/users/updateTodo/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxYzVmZjFmYzM4ZGFiMGMyZTQ2Mjk2In0sImlhdCI6MTY5NjM1ODM4NX0.yN0PvvafcOhTbUKUHFruoOVxmBhv1WeJSvmwOkl9kKw",
        },
        body: JSON.stringify({ content, complete }),
      }
    );
    // const json = response.json();
    // Logic to edit in client
    for (let index = 0; index < Todos.length; index++) {
      const element = Todos[index];
      if (element._id === id) {
        element.content = content;
        element.complete = complete;
      }
    }
  };
  return (
    <TodoContext.Provider
      value={{ Todos, fetchTodo, addTodo, deleteTodo, editTodo }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
