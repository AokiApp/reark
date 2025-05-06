import { BlockInnerComponent } from "../../types";
import { Text } from "./Text";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const HeadingBase: BlockInnerComponent<{
  level: HeadingLevel;
}> = ({ block, level }) => {
  const headingKey = `heading${level}` as const;
  const headingData = block[headingKey];

  if (!headingData?.elements) {
    return null;
  }

  return (
    <div
      className={`reark-heading reark-heading--${level}`}
      id={block.block_id}
    >
      <Text elements={headingData.elements} style={headingData.style} />
    </div>
  );
};

export const Heading1: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={1} />
);
export const Heading2: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={2} />
);
export const Heading3: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={3} />
);
export const Heading4: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={4} />
);
export const Heading5: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={5} />
);
export const Heading6: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={6} />
);
export const Heading7: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={7} />
);
export const Heading8: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={8} />
);
export const Heading9: BlockInnerComponent = ({ block }) => (
  <HeadingBase block={block} level={9} />
);
