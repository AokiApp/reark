import { render } from "@testing-library/react";
import { LarkRenderer } from "../LarkRenderer";

describe("LarkRenderer", () => {
  it("正常系スナップショットテスト", () => {
    const exampleBlock = {
      block_id: "ZIjadstYfoQVMjxXAwRjM0rVpVg",
      block_type: 1,
      children: ["K2jmdGqW1o0t8fx3CDNjV6vKpsf"],
    };
    const childBlock = {
      block_id: "K2jmdGqW1o0t8fx3CDNjV6vKpsf",
      block_type: 2,
      children: [],
      text: "テスト用子ブロック",
    };
    const { container } = render(
      <LarkRenderer initialData={{ blocks: [exampleBlock, childBlock] }} />,
    );
    expect(container).toMatchSnapshot();
  });
});
