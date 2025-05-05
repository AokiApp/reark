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