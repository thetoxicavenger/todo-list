import { Todo } from "..";

export default function TodoList({ todos, actions }) {
  return (
    <ol>
      {todos.allIds.map((todoId) => {
        const todo = todos.byId[todoId];
        return (
          <Todo key={todo.id} todo={todo} actions={actions}>
            {todo.text}
          </Todo>
        );
      })}
    </ol>
  );
}
