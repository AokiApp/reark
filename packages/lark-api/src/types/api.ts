import { Block } from "./block";

// export type DocumentBlockResponse = {
//   data: {
//     items: Array<
//       Partial<Block> & {
//         block_id?: string;
//         block_type?: number;
//         parent_id?: string;
//       }
//     >;
//     page_token?: string;
//   };
// };

type PagedResponse<T> = {
  code: number;
  msg: string;
  data: {
    has_more?: boolean;
    page_token?: string;
    items: T[];
  };
};

export type DocumentBlockResponse = PagedResponse<
  Partial<Block> & {
    block_id?: string;
    block_type?: number;
    parent_id?: string;
  }
>;

export type CommentListResponse = PagedResponse<CommentData>;

type CommentReply = {
  content: {
    elements: ReplyElement[];
  };
  reply_id: string;
};

export type CommentData = {
  comment_id: string;
  quote: string;
  reply_list?: {
    replies: CommentReply[];
  };
};

type ReplyElement =
  | {
      type: "text_run";
      text_run: {
        text: string;
      };
    }
  | {
      type: "docs_link";
      docs_link: {
        url: string;
      };
    }
  | {
      type: "person";
      person: {
        user_id: string;
      };
    };
