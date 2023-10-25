import { useState } from "react";
import { saveComment } from "./api";

export default function CommentForm(props) {
  const [comment, setComment] = useState("");

  return (
    <form
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        saveComment({ body: comment, postId: props.postId }).then(() => {
          setComment("");
          props.onSubmit();
        });
      }}
    >
      <input type="hidden" name="postId" value={props.postId} />
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          id="comment"
          onChange={(event) => {
            setComment(event.target.value);
          }}
          value={comment}
        />
        <label htmlFor="comment">Leave a comment</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
