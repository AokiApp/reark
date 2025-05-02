import { useContext } from "react";
import { CommentCard } from "./CommentCard";
import { LarkApiContext } from "../contexts/LarkApiContext";

export function CommentList() {
  const { comments } = useContext(LarkApiContext);

  if (!comments) return null;
  if (comments.length === 0) return <div>No comments available</div>;

  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} commentData={comment} />
      ))}
    </>
  );
}
