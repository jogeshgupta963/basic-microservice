import axios from "axios";
import React, { useRef } from "react";

function PostCreate() {
  const title = useRef("");

  const clickHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/posts", {
        title: title.current.value,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input ref={title} className="form-control" />
        </div>
        <button className="btn btn-primary" onClick={clickHandle}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostCreate;
