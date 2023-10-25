import { useLoaderData } from "react-router-dom";
import CommentForm from "../CommentForm";
import { useState } from "react";
import { deleteComment, fetchPostById } from "../api";

export default function Post() {
  const loadedPost = useLoaderData();
  const [post, setPost] = useState(loadedPost);

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <h4>By {post.user.name}</h4>

      <p>{post.body}</p>

      <h3>Comments</h3>
      <ol>
        {post.comments.map((comment) => {
          return (
            <li key={comment.id}>
              {comment.body}

              <button
                type="button"
                className="btn btn-link btn-sm"
                onClick={() => {
                  // pessimistic
                  // deleteComment(comment.id)
                  //   .then(() => {
                  //     return fetchPostById(post.id);
                  //   })
                  //   .then((post) => {
                  //     setPost(post);
                  //   });

                  // optimistic, doesn't have logic in case the DELETE fails
                  const deletedComment = comment;

                  deleteComment(deletedComment.id);

                  setPost({
                    ...post,
                    comments: post.comments.filter((comment) => {
                      return comment.id !== deletedComment.id;
                    }),
                  });
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ol>

      <CommentForm
        postId={post.id}
        onSubmit={() => {
          fetchPostById(post.id).then((post) => {
            setPost(post);
          });
        }}
      />
    </div>
  );
}
