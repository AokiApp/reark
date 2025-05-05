import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { UnorderedList } from "../../blocks/UnorderedList";

import { BlockStoreProvider } from "../../../contexts/BlockStoreContext";

// .private.local/example-blocks.json よりUnorderedListブロックの例

describe("UnorderedList block", () => {
  it("renders unordered list text", async () => {
    const unorderedListBlock = {
      block_id: "dummy-unordered-list",
      block_type: 12,
      bullet: {
        elements: [
          {
            text_run: {
              content: "Unordered",
              text_element_style: {
                bold: false,
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
          folded: false,
        },
      },
    };
    const { container, vrt } = renderWithVRT(
      <BlockStoreProvider items={[unorderedListBlock]}>
        <UnorderedList block={unorderedListBlock} />
      </BlockStoreProvider>,
    );
    expect(screen.getByText(/Unordered/)).toBeInTheDocument();
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders nothing when unordered list elements is empty", async () => {
  const unorderedListBlock = {
    block_id: "empty-unordered-list",
    block_type: 12,
    bullet: {
      elements: [],
      style: {
        align: 1 as const,
        folded: false,
      },
    },
  };
  const { container, vrt } = renderWithVRT(
    <BlockStoreProvider items={[unorderedListBlock]}>
      <UnorderedList block={unorderedListBlock} />
    </BlockStoreProvider>,
  );
  await vrt();
  // reark-unordered-listが存在し、その中のreark-text-blockが空であることを期待
  const ulDiv = container.querySelector(".reark-unordered-list");
  expect(ulDiv).not.toBeNull();
  const textBlock = ulDiv?.querySelector(".reark-text-block");
  expect(textBlock).not.toBeNull();
  expect(textBlock?.textContent).toBe("");
});
