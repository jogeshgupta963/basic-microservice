import React from "react";
import { useState } from "react";
import axios from "axios";
function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const clickHandle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button onClick={clickHandle} className="btn btn-primary">
          Create comment
        </button>
      </form>
    </div>
  );
}

export default CommentCreate;
