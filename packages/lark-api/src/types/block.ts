export type TextStyle = {
  align?: number; // enum Align
  done?: boolean;
  folded?: boolean;
  language?: string; // enum CodeLanguage
  wrap?: boolean;
};

export type TextRun = {
  content: string;
  text_element_style?: TextElementStyle;
};

export type TextElementStyle = {
  text_color?: number;
  background_color?: number;
  bold?: boolean;
  inline_code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  comment_ids?: string[];
  link?: Link;
};

export type Link = {
  url: string;
};

export type Element = {
  text_run: TextRun;
};

export interface TextElement extends Element {
  mention_user?: unknown; // object(MentionUser)
  mention_doc?: unknown; // object(MentionDoc)
  reminder?: unknown; // object(Reminder)
  file?: unknown; // object(InlineFile)
  inline_block?: unknown; // object(InlineBlock)
  equation?: unknown; // object(Equation)
  undefined_element?: unknown; // object(UndefinedElement)
}

type BlockStyle = {
  align?: number;
  folded?: boolean;
  done?: boolean;
  sequence?: number | "auto";
};

export type BlockContent = {
  elements: Element[];
  style?: BlockStyle;
};

type ImageContent = {
  token: string;
  width: number;
  height: number;
};

type Table = {
  cells: string[];
  property: TableProperty;
};

type TableProperty = {
  row_size: number;
  column_size: number;
  column_width?: number[];
  header_row?: boolean;
  header_column?: boolean;
  merge_info?: TableMergeInfo[];
};

type TableMergeInfo = {
  row_span: number;
  col_span: number;
};

export type Block = {
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
};

export type Document = {
  blocks: Block[];
};

export type BlockContext = {
  block: Block;
  parent?: Block;
  level: number;
  document: Document;
};
