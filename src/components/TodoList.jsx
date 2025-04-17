import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <Droppable droppableId="todos">
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps}>
          {todos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided) => (
                <li
                  className={`todo-item ${todo.completed ? "completed" : ""}`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    transition: "transform 0.2s ease",
                  }}
                >
                  <span
                    onClick={() => toggleTodo(todo.id)}
                    style={{ cursor: "pointer", flex: 1, textAlign: "left" }}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => deleteTodo(todo.id)}>❌</button>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default TodoList;
