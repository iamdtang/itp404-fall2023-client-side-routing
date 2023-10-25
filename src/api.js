const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function fetchPosts() {
  return fetch(`${baseUrl}/posts?_expand=user`).then((response) => {
    return response.json();
  });
}

export function fetchPostById(postId) {
  return fetch(`${baseUrl}/posts/${postId}?_expand=user&_embed=comments`).then(
    (response) => {
      return response.json();
    }
  );
}
