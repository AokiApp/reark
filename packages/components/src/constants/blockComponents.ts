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
import { Table } from "../components/blocks/Table";
import { TableCell } from "../components/blocks/TableCell";
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
  27: Image, // Image
  31: Table, // Table
  32: TableCell, // TableCell
  34: QuoteContainer, // QuoteContainer
};
