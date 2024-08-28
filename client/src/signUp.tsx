import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/user/authSlice";
// 회원가입 폼 데이터 타입 정의
interface SignupFormData {
  id: string;
  password: string;
  confirmPassword: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
`;

const Input = styled.input`
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

export default function Signup() {
  const { register, handleSubmit, watch } = useForm<SignupFormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postSignup = async ({ id, password }: SignupFormData) => {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });

    const data = await response.json();
    console.log("데이터 다시 받아랑", data);
  };
  const onClick = (data: SignupFormData) => {
    // 비밀번호 확인 로직
    if (data.password !== data.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    postSignup(data);
    dispatch(loginSuccess());

    // 회원가입 후 메인 페이지로 이동
    navigate("/");
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onClick)}>
        <Input {...register("id", { required: true })} placeholder="아이디" />
        <Input
          {...register("password", { required: true, minLength: 6 })}
          placeholder="비밀번호"
          type="password"
        />
        <Input
          {...register("confirmPassword", { required: true, minLength: 6 })}
          placeholder="비밀번호 확인"
          type="password"
        />
        <Input type="submit" value={"회원가입"} />
      </Form>
    </Wrapper>
  );
}
