import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "./store";
import UpcomingMatches from "./component/upComingMatches";
import { deletePost, fetchTexts } from "./api/postApiService";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh; /* 높이 설정을 유지 */
`;

const BoardWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center; /* 가운데 정렬 */
`;

const Board = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px; /* UpcomingMatches와의 간격 */
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const DeleteButton = styled.div`
  background-color: #444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  position: absolute;
  top: 3px;
  right: 10px; // 우측에서 10px
  &:hover {
    background-color: #c0392b;
  }
  display: none;
`;
const PostItem = styled.li`
  border-bottom: 1px solid #dee2e6;
  padding: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer; /* 클릭 가능하게 변경 */
  position: relative;
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f1f3f5; /* hover 시 색상 변경 */
  }
  &:hover ${DeleteButton} {
    display: block; /* hover될 때 X 버튼이 보이도록 설정 */
  }
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  color: #343a40;
  font-weight: bold;
`;

const AuthorInfo = styled.small`
  color: #868e96;
  align-self: flex-end;
`;

const CreatedAt = styled.div`
  color: #868e96;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
`;
const LoadingMessage = styled.div`
  font-size: 1.2rem;
  color: #343a40;
`;

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  color: red;
`;

interface Author {
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
}

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchTexts,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClick = (post: Post) => {
    navigate(`/post/${post._id}`, { state: { post } });
  };

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any) => {
      alert(`댓글 삭제 실패: ${error.message}`);
    },
  });

  const onDeletePost = (postId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // eslint-disable-next-line no-restricted-globals
    if (confirm("정말로 이 항목을 삭제하시겠습니까?")) {
      deletePostMutation.mutate(postId);
    }
  };

  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (isError) {
    return <ErrorMessage>Error: {error.message}</ErrorMessage>;
  }

  return (
    <Wrapper>
      <BoardWrapper>
        {" "}
        <Board>
          <PostList>
            {data?.map((post) => (
              <PostItem key={post._id} onClick={() => handleClick(post)}>
                <PostTitle>{post.title}</PostTitle>
                <AuthorInfo>{post.author.name}</AuthorInfo>
                <CreatedAt>
                  {new Date(post.createdAt).toLocaleDateString()}{" "}
                  {new Date(post.createdAt).toLocaleTimeString().slice(0, -3)}
                </CreatedAt>

                {user?.username === post.author.name && (
                  <DeleteButton
                    onClick={(event) => onDeletePost(post._id, event)}
                  >
                    X
                  </DeleteButton>
                )}
              </PostItem>
            ))}
          </PostList>
        </Board>
      </BoardWrapper>

      <UpcomingMatches></UpcomingMatches>
    </Wrapper>
  );
}
