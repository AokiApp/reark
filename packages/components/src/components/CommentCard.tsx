import { css } from "@emotion/react";
import { CommentData } from "../types/api";
import { Mention } from "./Mention";

export function CommentCard({
  commentData: comment,
}: {
  commentData: CommentData;
}) {
  const containerStyle = css({
    padding: "16px",
    marginBottom: "8px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  });

  const quoteStyle = css({
    borderLeft: "2px solid lightgray",
    paddingLeft: "4px",
    fontSize: "10px",
    color: "#555",
    marginBottom: "8px",
  });

  const replyStyle = css({
    fontSize: "12px",
    marginTop: "8px",
    paddingLeft: "8px",
  });

  return (
    <div css={containerStyle}>
      <div css={quoteStyle}>{comment.quote}</div>
      {comment.reply_list?.replies.map((reply, i) => (
        <div key={i} css={replyStyle}>
          {reply.content.elements.map((element, j) => (
            <span key={j}>
              {element.type === "text_run" ? (
                element.text_run.text
              ) : element.type === "docs_link" ? (
                element.docs_link.url
              ) : element.type === "person" ? (
                <Mention userId={element.person.user_id} />
              ) : (
                ""
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
