import React, { useState } from "react";
import { useTodo } from "../Contexts/TodoContext";

function TodoForm() {
  const [todo, setTodos] = useState(" ");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodos("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write your Todo"
        className="w-full border border-zinc-400 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodos(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-4 py-1 bg-blue-600 text-white shrink-0 hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
