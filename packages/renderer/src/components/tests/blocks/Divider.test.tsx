import { render } from "@testing-library/react";
import { Divider } from "../../blocks/Divider";

describe("Divider block", () => {
  it("renders divider element", () => {
    const { container } = render(
      <Divider block={{ block_id: "dummy-divider", block_type: 8 }} />
    );
    // <hr>要素が存在し、className="reark-divider" であること
    const hr = container.querySelector("hr.reark-divider");
    expect(hr).not.toBeNull();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});