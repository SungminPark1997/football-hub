import styled from "styled-components";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/user/authSlice";
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
`;

export const Input = styled.input`
  padding: 10px 20px;

  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(loginSuccess());

    navigate("/");
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onClick)}>
        <Input {...register("id")} placeholder="아이디" />
        <Input
          {...register("password", { required: true, minLength: 6 })}
          placeholder="비밀번호"
          type="password"
        />
        <Input type="submit" value={"로그인"} />
      </Form>
    </Wrapper>
  );
}
