import { BlockInnerComponent } from "../../types";
import { TextInner } from "./Text";

const getTextAlign = (align?: number): "left" | "center" | "right" => {
  switch (align) {
    case 2:
      return "center";
    case 3:
      return "right";
    default:
      return "left";
  }
};

export const Todo: BlockInnerComponent = ({ block }) => {
  const todo = block.todo;

  if (!todo?.elements) {
    return null;
  }

  const isDone = todo.style?.done || false;

  const textAlign = getTextAlign(todo.style?.align);

  return (
    <div className="reark-todo" style={{ textAlign }}>
      <input
        type="checkbox"
        checked={isDone}
        className="reark-todo__checkbox"
        readOnly
      />
      <div
        className={
          "reark-todo__content" + (isDone ? " reark-todo__content--done" : "")
        }
      >
        <TextInner elements={todo.elements} />
      </div>
    </div>
  );
};
