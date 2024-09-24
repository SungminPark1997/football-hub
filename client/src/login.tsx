// Login.tsx
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setError } from "./features/user/authSlice";

interface FormData {
  id: string;
  password: string;
}

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
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postLogin = async ({ id, password }: FormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // JWT를 로컬 스토리지에 저장
        dispatch(
          loginSuccess({
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            profileImage: "https://via.placeholder.com/120",
          })
        );
        navigate("/");
      } else {
        dispatch(setError(data.message)); // 에러 메시지 처리
        if (data.message === "idFail") {
          alert("존재 하지 않는 아이디 입니다.");
        } else if (data.message === "passwordFail") {
          alert("패스워드가 틀렸습니다");
        }
      }
    } catch (error) {
      dispatch(setError("네트워크 오류 발생")); // 네트워크 에러 처리
    }
  };

  const onClick = (data: FormData) => {
    postLogin(data);
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
