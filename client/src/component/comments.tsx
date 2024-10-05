import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import styled from "styled-components";

const CommentsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const CommentItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const Author = styled.strong`
  display: block;
  margin-bottom: 5px;
  font-size: 1.1em;
  color: #333;
`;

const CommentContent = styled.p`
  font-size: 0.8em;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 1em;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 1em;
  color: #555;
`;

// 댓글 인터페이스
interface Comment {
  _id: string;
  content: string;
  author: {
    name: string;
  };
}

interface PostId {
  postId: string; // 소문자 string으로 변경
}

interface NewComment {
  content: string;
  userId: string | undefined; // 유저 ID
}

export default function Comments({ postId }: PostId) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const user = useSelector((state: RootState) => state.auth.user);
  const limit = 10; // 한 페이지에 보여줄 댓글 수

  const queryClient = useQueryClient();

  // react-hook-form 사용
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ content: string }>();

  // 댓글 불러오기 함수
  const fetchComments = async (page: number) => {
    const response = await fetch(
      `http://localhost:5000/api/post/comments/${postId}?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return response.json();
  };

  // 댓글 등록 mutation

  // 댓글 불러오기 query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", currentPage],
    queryFn: () => fetchComments(currentPage),
  });
  const mutation = useMutation({
    mutationFn: async (newComment: NewComment) => {
      const response = await fetch(
        `http://localhost:5000/api/post/comments/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      return response.json(); // TypeScript는 이 반환 값을 Comment로 추론해야 함
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", currentPage] }); // 댓글 목록 갱신
      reset(); // 폼 리셋
    },
    onError: (error: any) => {
      alert(`댓글 작성 실패: ${error.message}`);
    },
  });

  console.log("데이터 받아와라", data);

  const onSubmit = (formData: { content: string }) => {
    const newComment: NewComment = {
      content: formData.content,
      userId: user?.id,
    };
    mutation.mutate(newComment); // mutate 호출
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <CommentsContainer>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <CommentsList>
          {data?.comments.map((comment: Comment) => (
            <CommentItem key={comment._id}>
              <Author>{comment.author.name}</Author>
              <CommentContent>{comment.content}</CommentContent>
            </CommentItem>
          ))}
        </CommentsList>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          {...register("content", { required: "댓글 내용을 입력하세요." })}
          placeholder="댓글을 입력하세요..."
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}

        <SubmitButton type="submit">댓글 작성하기</SubmitButton>
      </Form>

      <Pagination>
        <PageButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </PageButton>
        <PageInfo>
          {currentPage} / {totalPages}
        </PageInfo>
        <PageButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </Pagination>
    </CommentsContainer>
  );
}
