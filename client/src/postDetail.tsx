import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Comments from "./component/comments";

// 페이지 전체 레이아웃
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f3f5;
  padding: 20px;
`;

// 게시글을 카드 형식으로 꾸밈
const PostCard = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
`;

// 제목 스타일
const PostTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #212529;
  margin-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
`;

// 본문 내용 스타일
const PostContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #495057;
  margin: 20px 0;
`;

// 작성자 정보 스타일
const AuthorInfo = styled.div`
  font-size: 1rem;
  color: #868e96;
  text-align: right;
  margin-top: 30px;
  padding-bottom: 20px;
`;

// 버튼 스타일
const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function PostDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const { post } = location.state;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Wrapper>
      <PostCard>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>{post.content}</PostContent>
        <AuthorInfo>Written by: {post.author.name}</AuthorInfo>
        <Comments postId={post._id} />
        <BackButton onClick={() => navigate(-1)}>Back to list</BackButton>
      </PostCard>
    </Wrapper>
  );
}
