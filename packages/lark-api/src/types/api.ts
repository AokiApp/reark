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

/**
 * Response for listing comments on a document.
 * See: https://open.larksuite.com/document/server-docs/docs/drive-v1/CommentAPI/list
 */
export type CommentListResponse = PagedResponse<CommentData>;

/**
 * Represents a single comment on a document.
 */
export type CommentData = {
  comment_id: string;
  user_id: string;
  create_time: number;
  update_time: number;
  is_solved: boolean;
  solved_time: number;
  solver_user_id: string;
  has_more: boolean;
  page_token: string;
  is_whole: boolean;
  quote: string;
  reply_list?: ReplyList;
};

/**
 * List of replies to a comment.
 */
export type ReplyList = {
  replies: CommentReply[];
};

/**
 * Represents a single reply to a comment.
 */
export type CommentReply = {
  reply_id: string;
  user_id: string;
  create_time: number;
  update_time: number;
  content: {
    elements: ReplyElement[];
  };
  extra?: ReplyExtra;
};

/**
 * Extra data for a reply (e.g., image attachments).
 */
export type ReplyExtra = {
  image_list?: string[];
};

/**
 * Elements that make up the content of a reply.
 */
export type ReplyElement =
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
