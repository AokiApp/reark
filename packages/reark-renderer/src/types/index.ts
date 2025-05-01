import { Block } from "./block";

// I want truly empty object type
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type BlockInnerComponent<T = {}> = React.FC<
  {
    block: Block;
  } & T
>;
