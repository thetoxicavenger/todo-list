import styled from "styled-components";

const LI = styled.li`
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
  margin-bottom: 20px;
  line-height: 1.4;
`;

export default function Todo({ children, todo, actions }) {
  return (
    <LI done={todo.done}>
      {children}&nbsp;&nbsp;
      <button onClick={() => actions.toggle(todo.id)}>
        {todo.done ? "NOT DONE" : "DONE"}
      </button>
      &nbsp;&nbsp;
      <button onClick={() => actions.remove(todo.id)}>DELETE</button>
    </LI>
  );
}
