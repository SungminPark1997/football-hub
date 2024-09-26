import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  height: 100vh;
`;

const PostTitle = styled.h1`
  font-size: 2rem;
  color: #343a40;
`;

const PostContent = styled.p`
  font-size: 1.2rem;
  color: #495057;
  margin: 20px 0;
`;

const AuthorInfo = styled.small`
  color: #868e96;
`;

export default function PostDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  // location.state에서 데이터를 받아옴
  const { post } = location.state;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Wrapper>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      <AuthorInfo>Author: {post.author.name}</AuthorInfo>
      <button onClick={() => navigate(-1)}>Back to list</button>
    </Wrapper>
  );
}
