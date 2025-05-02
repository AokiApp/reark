import type { CommentData } from "../../lark-api";
import { Mention } from "./Mention";
import "../styles/blocks.css";

export function CommentCard({
  commentData: comment,
}: {
  commentData: CommentData;
}) {
  return (
    <div className="reark-comment-card">
      <div className="reark-comment-card__quote">{comment.quote}</div>
      {comment.reply_list?.replies.map((reply, i) => (
        <div key={i} className="reark-comment-card__reply">
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
