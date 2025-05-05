import { render, screen } from "@testing-library/react";
import { Image } from "../../blocks/Image";

const imageBlock = {
  block_id: "dummy-image",
  block_type: 18,
  image: {
    token: "dummy",
    width: 100,
    height: 100,
    align: 1 as 1
  }
};

describe("Image block", () => {
  it("renders image placeholder when file is unavailable", () => {
    const { container } = render(<Image block={imageBlock} />);
    expect(screen.getByText(/Image not available/)).toBeInTheDocument();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
});