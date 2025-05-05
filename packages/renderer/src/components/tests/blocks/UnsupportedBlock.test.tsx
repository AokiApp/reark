import { render, screen } from "@testing-library/react";
import { UnsupportedBlock } from "../../blocks/UnsupportedBlock";

describe("UnsupportedBlock", () => {
  it("renders unsupported block message", () => {
    const { container } = render(<UnsupportedBlock type={42} />);
    expect(screen.getByText(/Unsupported block type: 42/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});
it("renders unsupported block message with undefined type", () => {
  // @ts-expect-error 故意にtypeを渡さない
  const { container } = render(<UnsupportedBlock />);
  expect(container.textContent).toMatch(/Unsupported block type/);
});
