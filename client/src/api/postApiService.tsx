export const fetchTexts = async () => {
  const response = await fetch("http://localhost:5000/api/post/getText");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const deletePost = async (postId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/post/deleteText/${postId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete Text");
  }
  return response.json();
};
export const deleteComment = async (commentId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/post/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }
  return response.json();
};
