import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { Todo } from "../../blocks/Todo";

// .private.local/example-blocks.json よりTodoブロックの例

describe("Todo block", () => {
  it("renders todo text and checkbox", async () => {
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
    const { container, vrt } = renderWithVRT(<Todo block={todoBlock} />);
    expect(screen.getByText(/タスク 1/)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders todo with no elements", async () => {
  const todoBlock = {
    block_id: "empty-todo",
    block_type: 20,
    todo: {
      elements: [],
      style: {
        align: 1 as const,
        done: false,
      },
    },
  };
  const { container, vrt } = renderWithVRT(<Todo block={todoBlock} />);
  // チェックボックスのみが描画されること
  const checkbox = container.querySelector('input[type="checkbox"]');
  expect(checkbox).not.toBeNull();
  // テキストが空であること
  expect(container.textContent?.replace(/\s/g, "")).toBe("");
  await vrt();
  // スナップショットテスト
  expect(container).toMatchSnapshot();
});
