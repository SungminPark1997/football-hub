import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const TitleInput = styled.input`
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ContentInput = styled.textarea`
  font-size: 16px;
  padding: 10px;
  height: 200px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PostForm = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const onClick = async (data: any) => {
    try {
      const response = await fetch("http://localhost:5000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // 폼 제출 후 메인 페이지로 이동
        navigate("/");
      } else {
        console.error("Failed to submit post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onClick)}>
        <TitleInput {...register("title")} placeholder="제목을 입력하시오" />
        <ContentInput {...register("content")} placeholder="작성할 내용" />
        <SubmitButton type="submit">작성하기</SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default PostForm;
