type CommentProps = {
  commentIds: string[];
  children: React.ReactNode;
};

export function Comment({ commentIds, children }: CommentProps) {
  return (
    <div className="reark-comment" data-comment-ids={commentIds.join(",")}>
      {children}
    </div>
  );
}
