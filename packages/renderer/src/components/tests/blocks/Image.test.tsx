import { renderWithVRT } from "../test-utils/renderWithVRT";
import { screen } from "@testing-library/react";
import { Image } from "../../blocks/Image";

describe("Image block", () => {
  it("renders image placeholder when file is unavailable", async () => {
    const imageBlock = {
      block_id: "dummy-image",
      block_type: 18,
      image: {
        token: "dummy",
        width: 100,
        height: 100,
        align: 1 as const,
      },
    };
    const { container, vrt } = renderWithVRT(<Image block={imageBlock} />);
    expect(screen.getByText(/Image not available/)).toBeInTheDocument();
    await vrt();
    // スナップショットテスト
    expect(container).toMatchSnapshot();
  });
  it("renders nothing when token is missing", async () => {
    // tokenが空文字の場合
    const blockNoToken = {
      block_id: "dummy-image-no-token",
      block_type: 18,
      image: {
        token: "",
        width: 100,
        height: 100,
        align: 1 as const,
      },
    };
    const { container, vrt } = renderWithVRT(<Image block={blockNoToken} />);
    // 何も描画されないことを期待
    expect(container.firstChild).toBeNull();
    await vrt();
  });
});

it("renders nothing when image token is undefined", async () => {
  const imageBlock = {
    block_id: "dummy-image-undefined-token",
    block_type: 18,
    image: {
      token: undefined,
      width: 100,
      height: 100,
      align: 1 as const,
    },
  };
  const { container, vrt } = renderWithVRT(<Image block={imageBlock} />);
  // 何も描画されないことを期待
  expect(container.firstChild).toBeNull();
  await vrt();
});
