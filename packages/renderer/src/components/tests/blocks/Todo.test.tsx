import { render, screen } from "@testing-library/react";
import { Todo } from "../../blocks/Todo";

// .private.local/example-blocks.json よりTodoブロックの例

describe("Todo block", () => {
  it("renders todo text and checkbox", () => {
    const todoBlock = {
      block_id: "dummy-todo",
      block_type: 20,
      todo: {
        elements: [
          {
            text_run: {
              content: "タスク 1",
              text_element_style: {
                bold: false,
                comment_ids: ["7500745463407050785"],
                inline_code: false,
                italic: false,
                strikethrough: false,
                underline: false,
              },
            },
          },
        ],
        style: {
          align: 1 as const,
          done: false,
        },
      },
    };
    const { container } = render(<Todo block={todoBlock} />);
    expect(screen.getByText(/タスク 1/)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});
