import type { Block } from "../../lark-api";

// I want truly empty object type
// eslint-disable-next-line @typescript-eslint/ban-types
export type BlockInnerComponent<T = {}> = React.FC<
  {
    block: Block;
  } & T
>;
