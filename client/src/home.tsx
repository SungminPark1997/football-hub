import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Board = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PostItem = styled.li`
  border-bottom: 1px solid #dee2e6;
  padding: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer; /* 클릭 가능하게 변경 */

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f1f3f5; /* hover 시 색상 변경 */
  }
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  color: #343a40;
`;

const AuthorInfo = styled.small`
  color: #868e96;
  align-self: flex-end;
`;

const LoadingMessage = styled.div`
  font-size: 1.2rem;
  color: #343a40;
`;

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  color: red;
`;

const fetchTexts = async () => {
  const response = await fetch("http://localhost:5000/api/post/getText");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

interface Author {
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
}

export default function Home() {
  const { data, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchTexts,
  });

  const navigate = useNavigate();

  const handleClick = (post: Post) => {
    navigate(`/post/${post._id}`, { state: { post } });
  };

  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (isError) {
    return <ErrorMessage>Error: {error.message}</ErrorMessage>;
  }

  return (
    <Wrapper>
      <Board>
        <PostList>
          {data?.map((post) => (
            <PostItem key={post._id} onClick={() => handleClick(post)}>
              <PostTitle>제목: {post.title}</PostTitle>
              <AuthorInfo>Author: {post.author.name}</AuthorInfo>
            </PostItem>
          ))}
        </PostList>
      </Board>
    </Wrapper>
  );
}
