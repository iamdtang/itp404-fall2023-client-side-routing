import { useLoaderData } from "react-router-dom";
import CommentForm from "../CommentForm";
import { useState } from "react";
import { fetchPostById } from "../api";

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
          return <li key={comment.id}>{comment.body}</li>;
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
