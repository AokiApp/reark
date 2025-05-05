import { renderWithVRT } from "../test-utils/renderWithVRT";
import { LarkRenderer } from "../../LarkRenderer";

// LarkRenderer 異常系: 空データ
describe("LarkRenderer 異常系: 空データ", () => {
  it("blocksが空配列の場合はnullを返す", async () => {
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks: [] }} />,
    );
    await vrt();
    expect(container.firstChild).toBeNull();
  });

  it("blocksがundefinedの場合はnullを返す", async () => {
    const { container, vrt } = renderWithVRT(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <LarkRenderer initialData={{ blocks: undefined as any }} />,
    );
    await vrt();
    expect(container.firstChild).toBeNull();
  });
});

// LarkRenderer 異常系: 不正なblock_type
describe("LarkRenderer 異常系: 不正なblock_type", () => {
  it("未知のblock_typeを含む場合もUnsupportedBlockとしてレンダリングされる", async () => {
    const block = {
      block_id: "invalid-block",
      block_type: 9999,
      parent_id: "",
      children: [],
      text: "不正なブロック",
    };
    const blocks = [block];
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});

// LarkRenderer 異常系: childrenプロパティ欠損
describe("LarkRenderer 異常系: childrenプロパティ欠損", () => {
  it("childrenプロパティが存在しないブロックもレンダリングできる", async () => {
    const block = {
      block_id: "no-children",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "children欠損",
              text_element_style: { bold: false },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      // childrenプロパティ無し
    };
    const blocks = [block];
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});

// LarkRenderer 異常系: childrenが空配列
describe("LarkRenderer 異常系: childrenが空配列", () => {
  it("childrenが空配列でも正常にレンダリングできる", async () => {
    const block = {
      block_id: "empty-children",
      block_type: 2,
      parent_id: "",
      text: {
        elements: [
          {
            text_run: {
              content: "children空配列",
              text_element_style: { bold: false },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      children: [],
    };
    const blocks = [block];
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});

// LarkRenderer 異常系: 親無し子ブロック
describe("LarkRenderer 異常系: 親無し子ブロック", () => {
  it("親が存在しないchildrenを持つブロックもレンダリングできる", async () => {
    const childBlock = {
      block_id: "orphan-child",
      block_type: 2,
      parent_id: "non-existent-parent",
      text: {
        elements: [
          {
            text_run: {
              content: "親無し子ブロック",
              text_element_style: { bold: false },
            },
          },
        ],
        style: { align: "left", folded: false },
      },
      children: [],
    };
    const blocks = [childBlock];
    const { container, vrt } = renderWithVRT(
      <LarkRenderer initialData={{ blocks }} />,
    );
    await vrt();
    expect(container).toMatchSnapshot();
  });
});
