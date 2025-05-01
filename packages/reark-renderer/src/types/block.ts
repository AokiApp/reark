export interface TextStyle {
  align?: number; // enum Align
  done?: boolean;
  folded?: boolean;
  language?: string; // enum CodeLanguage
  wrap?: boolean;
}

export interface TextRun {
  content: string;
  text_element_style?: TextElementStyle;
}

export interface TextElementStyle {
  text_color?: number;
  background_color?: number;
  bold?: boolean;
  inline_code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  comment_ids?: string[];
  link?: Link;
}

export interface Link {
  url: string;
}

export interface Element {
  text_run: TextRun;
}

export interface TextElement extends Element {
  mention_user?: unknown; // object(MentionUser)
  mention_doc?: unknown; // object(MentionDoc)
  reminder?: unknown; // object(Reminder)
  file?: unknown; // object(InlineFile)
  inline_block?: unknown; // object(InlineBlock)
  equation?: unknown; // object(Equation)
  undefined_element?: unknown; // object(UndefinedElement)
}

interface BlockStyle {
  align?: number;
  folded?: boolean;
  done?: boolean;
  sequence?: number | "auto";
}

export interface BlockContent {
  elements: Element[];
  style?: BlockStyle;
}

interface ImageContent {
  token: string;
  width: number;
  height: number;
}

interface Table {
  cells: string[];
  property: TableProperty;
}

interface TableProperty {
  row_size: number;
  column_size: number;
  column_width?: number[];
  header_row?: boolean;
  header_column?: boolean;
  merge_info?: TableMergeInfo[];
}

interface TableMergeInfo {
  row_span: number;
  col_span: number;
}

export interface Block {
  block_id: string;
  block_type: number;
  parent_id: string;
  children?: string[];
  page?: BlockContent;
  text?: BlockContent;
  heading1?: BlockContent;
  heading2?: BlockContent;
  heading3?: BlockContent;
  heading4?: BlockContent;
  heading5?: BlockContent;
  heading6?: BlockContent;
  heading7?: BlockContent;
  heading8?: BlockContent;
  heading9?: BlockContent;
  bullet?: BlockContent;
  ordered?: BlockContent;
  code?: BlockContent & {
    style?: {
      language: number;
    };
  };
  todo?: BlockContent & {
    style?: BlockStyle & {
      done?: boolean;
    };
  };
  callout?: {
    background_color: number;
    border_color: number;
    emoji_id: string;
  };
  image?: ImageContent;
  table?: Table;
  quote?: BlockContent;
  comment_ids?: string[];
}

export interface Document {
  blocks: Block[];
}

export interface BlockContext {
  block: Block;
  parent?: Block;
  level: number;
  document: Document;
}
