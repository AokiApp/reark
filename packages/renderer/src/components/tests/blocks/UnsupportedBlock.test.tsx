import { renderWithVRT } from "../test-utils/renderWithVRT";
import { UnsupportedBlock } from "../../blocks/UnsupportedBlock";

describe("UnsupportedBlock", () => {
  it("renders unsupported block message", async () => {
    const { container, vrt } = renderWithVRT(
      <UnsupportedBlock block={{ block_id: "dummy", block_type: 42 }} />,
    );
    expect(container.textContent).toMatch(/Unsupported block type: 42/);
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});

it("renders unsupported block message with undefined block_type", async () => {
  const { container, vrt } = renderWithVRT(
    <UnsupportedBlock
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      block={{ block_id: "dummy", block_type: undefined as any }}
    />,
  );
  expect(container.textContent).toMatch(/Unsupported block type/);
  await vrt();
  expect(container).toMatchSnapshot();
});

it("renders unsupported block message with undefined block_id and block_type", async () => {
  const { container, vrt } = renderWithVRT(
    <UnsupportedBlock
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      block={{ block_id: undefined as any, block_type: undefined as any }}
    />,
  );
  expect(container.textContent).toMatch(/Unsupported block type/);
  await vrt();
  expect(container).toMatchSnapshot();
});
