import { Page } from "../components/blocks/Page";
import { TextBlock } from "../components/blocks/Text";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Heading7,
  Heading8,
  Heading9,
} from "../components/blocks/Heading";
import { UnorderedList } from "../components/blocks/UnorderedList";
import { OrderedList } from "../components/blocks/OrderedList";
import { CodeBlock } from "../components/blocks/CodeBlock";
import { Todo } from "../components/blocks/Todo";
import { Callout } from "../components/blocks/Callout";
import { Divider } from "../components/blocks/Divider";
import { Image } from "../components/blocks/Image";
import { QuoteContainer } from "../components/blocks/QuoteContainer";
import { FileBlock } from "../components/blocks/FileBlock";
import { Table } from "../components/blocks/Table";
import { TableCell } from "../components/blocks/TableCell";
import { GridBlock } from "../components/blocks/GridBlock";
import { GridColumnBlock } from "../components/blocks/GridColumnBlock";
import { ViewBlock } from "../components/blocks/ViewBlock";
import { IframeBlock } from "../components/blocks/IframeBlock";
import { BlockInnerComponent } from "../types";

export const BLOCK_COMPONENTS: Record<number, BlockInnerComponent> = {
  1: Page, // Page
  2: TextBlock, // Text
  3: Heading1, // Heading1
  4: Heading2, // Heading2
  5: Heading3, // Heading3
  6: Heading4, // Heading4
  7: Heading5, // Heading5
  8: Heading6, // Heading6
  9: Heading7, // Heading7
  10: Heading8, // Heading8
  11: Heading9, // Heading9
  12: UnorderedList, // UnorderedList
  13: OrderedList, // OrderedList
  14: CodeBlock, // CodeBlock
  17: Todo, // Todo
  19: Callout, // Callout
  22: Divider, // Divider
  23: FileBlock, // FileBlock: ファイル本体（block_type: 23）。通常はViewBlock（33）とセットで使われる。
  27: Image, // Image
  31: Table, // Table
  32: TableCell, // TableCell
  34: QuoteContainer, // QuoteContainer
  24: GridBlock, // GridBlock
  25: GridColumnBlock, // GridColumnBlock
  // 33: ViewBlock
  // ファイルブロック（block_type: 23）のビュー表現（カード/プレビュー/インライン）。
  // 通常、親がblock_type: 23（File Block）であり、ViewBlock.tsxでファイル情報を参照してレンダリングする。
  33: ViewBlock,
  26: IframeBlock, // IframeBlock
};
