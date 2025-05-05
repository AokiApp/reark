import { renderWithVRT } from "../test-utils/renderWithVRT";
import { UnsupportedBlock } from "../../blocks/UnsupportedBlock";

describe("UnsupportedBlock", () => {
  it("renders unsupported block message", async () => {
    const { container, vrt } = renderWithVRT(<UnsupportedBlock type={42} />);
    expect(container.textContent).toMatch(/Unsupported block type: 42/);
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders unsupported block message with undefined type", async () => {
  // @ts-expect-error 故意にtypeを渡さない
  const { container, vrt } = renderWithVRT(<UnsupportedBlock />);
  expect(container.textContent).toMatch(/Unsupported block type/);
  await vrt();
  expect(container).toMatchSnapshot();
});
