import React from "react";

function CommentList({ comments }) {
  const renderCmt = comments.map((c) => {
    if (c.status === "rejected") c.content = "rejected";
    if (c.status === "pending") c.content = "pending";

    return <li key={c.id}>{c.content}</li>;
  });

  return <ul>{renderCmt}</ul>;
}

export default CommentList;
