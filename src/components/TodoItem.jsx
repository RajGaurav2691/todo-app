import React from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>❌</button>
    </li>
  );
};

export default TodoItem;
