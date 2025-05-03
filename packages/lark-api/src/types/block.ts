/**
 * Updated to match the latest Lark API Block Data Structure and Document Block List API.
 * All block types and their fields are included as per the latest documentation.
 */

export type Align = 1 | 2 | 3; // 1: left, 2: center, 3: right

export type CodeLanguage = number; // See Lark docs for mapping

export type TextStyle = {
  align?: Align;
  done?: boolean;
  folded?: boolean;
  language?: CodeLanguage;
  wrap?: boolean;
};

export type TextElementStyle = {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  inline_code?: boolean;
  text_color?: number; // FontColor enum
  background_color?: number; // FontBackgroundColor enum
  link?: Link;
  comment_ids?: string[];
};

export type Link = {
  url: string;
};

export type TextRun = {
  content: string;
  text_element_style?: TextElementStyle;
};

export type MentionUser = {
  user_id: string;
  text_element_style?: TextElementStyle;
};

export type MentionDoc = {
  token: string;
  obj_type: number;
  url: string;
  title?: string;
  text_element_style?: TextElementStyle;
};

export type Reminder = {
  create_user_id: string;
  is_notify?: boolean;
  is_whole_day?: boolean;
  expire_time: string;
  notify_time: string;
  text_element_style?: TextElementStyle;
};

export type InlineFile = {
  file_token?: string;
  source_block_id?: string;
  text_element_style?: TextElementStyle;
};

export type InlineBlock = {
  block_id: string;
  text_element_style?: TextElementStyle;
};

export type Equation = {
  content: string;
  text_element_style?: TextElementStyle;
};

export type UndefinedElement = Record<string, never>;

export type TextElement = {
  text_run?: TextRun;
  mention_user?: MentionUser;
  mention_doc?: MentionDoc;
  reminder?: Reminder;
  file?: InlineFile;
  inline_block?: InlineBlock;
  equation?: Equation;
  undefined_element?: UndefinedElement;
};

export type BlockContent = {
  elements: TextElement[];
  style?: TextStyle;
};

export type ImageBlock = {
  token?: string;
  width?: number;
  height?: number;
  align?: Align;
};

export type TableMergeInfo = {
  row_span: number;
  col_span: number;
};

export type TableProperty = {
  row_size: number;
  column_size: number;
  column_width?: number[];
  header_row?: boolean;
  header_column?: boolean;
  merge_info?: TableMergeInfo[];
};

export type TableBlock = {
  cells?: string[];
  property: TableProperty;
};

export type CalloutBlock = {
  background_color?: number;
  border_color?: number;
  text_color?: number;
  emoji_id?: string;
};

export type ChatCardBlock = {
  chat_id: string;
  align?: Align;
};

export type DiagramBlock = {
  diagram_type?: number;
};

export type DividerBlock = Record<string, never>;

export type FileBlock = {
  token?: string;
  name?: string;
  view_type?: number;
};

export type GridBlock = {
  column_size: number;
};

export type GridColumnBlock = {
  width_ratio?: number;
};

export type IframeBlock = {
  component: {
    iframe_type: number;
    url: string;
  };
};

export type ISVBlock = {
  component_id?: string;
  component_type_id?: string;
};

export type MindnoteBlock = {
  token: string;
};

export type SheetBlock = {
  token?: string;
  row_size?: number;
  column_size?: number;
};

export type TableCellBlock = Record<string, never>;

export type ViewBlock = {
  view_type?: number;
};

export type QuoteContainerBlock = Record<string, never>;

export type TaskBlock = {
  task_id: string;
};

export type OKRBlock = {
  okr_id?: string;
  period_display_status?: string;
  period_name_zh?: string;
  period_name_en?: string;
  user_id?: string;
  visible_setting?: {
    progress_fill_area_visible?: boolean;
    progress_status_visible?: boolean;
    score_visible?: boolean;
  };
};

export type OkrObjectiveBlock = {
  objective_id?: string;
  confidential?: boolean;
  position?: number;
  score?: number;
  visible?: boolean;
  weight?: number;
  progress_rate?: {
    mode?: string;
    current?: number;
    percent?: number;
    progress_status?: string;
    status_type?: string;
    start?: number;
    target?: number;
  };
  content?: BlockContent;
};

export type OkrKeyResultBlock = {
  kr_id?: string;
  confidential?: boolean;
  position?: number;
  score?: number;
  visible?: boolean;
  weight?: number;
  progress_rate?: {
    mode?: string;
    current?: number;
    percent?: number;
    progress_status?: string;
    status_type?: string;
    start?: number;
    target?: number;
  };
  content?: BlockContent;
};

export type OkrProgressBlock = Record<string, never>;

export type AddOnsBlock = {
  component_id?: string;
  component_type_id?: string;
  record?: string;
};

export type JiraIssueBlock = {
  id?: string;
  key?: string;
};

export type WikiCatalogBlock = {
  wiki_token?: string;
};

export type Block = {
  block_id: string;
  block_type: number;
  parent_id?: string;
  children?: string[];
  comment_ids?: string[];

  // BlockData (one of the following, depending on block_type)
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
  code?: BlockContent;
  quote?: BlockContent;
  todo?: BlockContent;
  bitable?: { token: string; view_type: number };
  callout?: CalloutBlock;
  chat_card?: ChatCardBlock;
  diagram?: DiagramBlock;
  divider?: DividerBlock;
  file?: FileBlock;
  grid?: GridBlock;
  grid_column?: GridColumnBlock;
  iframe?: IframeBlock;
  image?: ImageBlock;
  isv?: ISVBlock;
  mindnote?: MindnoteBlock;
  sheet?: SheetBlock;
  table?: TableBlock;
  table_cell?: TableCellBlock;
  view?: ViewBlock;
  undefined?: Record<string, never>;
  quote_container?: QuoteContainerBlock;
  task?: TaskBlock;
  okr?: OKRBlock;
  okr_objective?: OkrObjectiveBlock;
  okr_key_result?: OkrKeyResultBlock;
  okr_progress?: OkrProgressBlock;
  add_ons?: AddOnsBlock;
  jira_issue?: JiraIssueBlock;
  wiki_catalog?: WikiCatalogBlock;
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
