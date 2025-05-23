// @jest-environment node
import { renderWithVRT } from "../test-utils/renderWithVRT";
import { Divider } from "../../blocks/Divider";

describe("Divider block", () => {
  it("renders divider element", async () => {
    const { container, vrt } = renderWithVRT(
      <Divider block={{ block_id: "dummy-divider", block_type: 8 }} />,
    );
    // <hr>要素が存在し、className="reark-divider" であること
    const hr = container.querySelector("hr.reark-divider");
    expect(hr).not.toBeNull();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
    await vrt();
  });

  it("renders nothing when block is undefined", async () => {
    // blockがundefinedの場合
    const { container, vrt } = renderWithVRT(
      // @ts-expect-error 故意にblockを渡さない
      <Divider />,
    );
    // reark-dividerクラスのhrが描画されることを期待
    const hr = container.querySelector("hr.reark-divider");
    expect(hr).not.toBeNull();
    await vrt();
  });
});
