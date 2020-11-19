import { useState } from "react";
import { usePersist } from "./hooks";
import { TodoList } from "./components";

const todosInitialState = {
  byId: {},
  allIds: [],
};

function App() {
  const [adding, setAdding] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const { value: todos, customSetValue: setTodos } = usePersist({
    itemName: "todos",
    initialState: todosInitialState,
  });

  const toggleAdding = () => {
    setAdding((prevAdding) => {
      return !prevAdding;
    });
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo !== "") {
      setTodos((prevTodos) => {
        const newTodoId = prevTodos.allIds.length.toString();
        return {
          ...prevTodos,
          byId: {
            ...prevTodos.byId,
            [newTodoId]: {
              id: newTodoId,
              text: newTodo,
              done: false,
            },
          },
          allIds: [...prevTodos.allIds, newTodoId],
        };
      });
      setNewTodo("");
    }
  };

  const toggleCompleted = (todoId) => {
    setTodos((prevTodos) => {
      return {
        ...prevTodos,
        byId: {
          ...prevTodos.byId,
          [todoId]: {
            ...prevTodos.byId[todoId],
            done: !prevTodos.byId[todoId].done,
          },
        },
      };
    });
  };

  const deleteTodo = (todoIdToDelete) => {
    setTodos((prevTodos) => {
      const newTodos = { byId: {}, allIds: [] };
      prevTodos.allIds.forEach((id) => {
        if (id !== todoIdToDelete) {
          newTodos.byId[id] = prevTodos.byId[id];
          newTodos.allIds.push(id);
        }
      });
      return newTodos;
    });
  };

  return (
    <main>
      <h1>
        Todos <button onClick={toggleAdding}>{adding ? "-" : "+"}</button>
      </h1>
      {adding && (
        <section>
          <form onSubmit={addTodo}>
            <div>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => {
                  setNewTodo(e.target.value);
                }}
              />{" "}
              <input type="submit" value="Add" />
            </div>
          </form>
        </section>
      )}
      <section>
        <ol>
          <TodoList
            todos={todos}
            actions={{
              toggle: toggleCompleted,
              remove: deleteTodo,
            }}
          />
        </ol>
      </section>
      <section>
        <h2>Deleted</h2>
        <ol></ol>
      </section>
    </main>
  );
}

export default App;
