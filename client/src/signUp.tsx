import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/user/authSlice";

// 회원가입 폼 데이터 타입 정의
interface SignupFormData {
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  name: string;
  agreeToTerms: boolean;
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

const Button = styled.button`
  padding: 5px 10px;
  width: 150px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PassMessage = styled.div`
  color: white;
  font-size: 14px;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;

export default function Signup() {
  const { register, handleSubmit, watch } = useForm<SignupFormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [idMessage, setIdMessage] = useState<string | null>(null);

  // 아이디 중복 체크 함수
  const checkIdAvailability = async (id: string) => {
    if (id.length === 0) {
      setIdMessage("아이디를 입력하세요");
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/check-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();

        if (data.message === "ID already exists") {
          setIsIdAvailable(false);
          setIdMessage("이미 사용 중인 아이디입니다.");
        } else {
          setIsIdAvailable(true);
          setIdMessage("사용 가능합니다.");
        }
      } catch (error) {
        setIsIdAvailable(false);
        setIdMessage("아이디 중복 체크 중 오류가 발생했습니다.");
      }
    }
  };

  const postSignup = async ({ id, password, email, name }: SignupFormData) => {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password, email, name }),
    });

    const data = await response.json();
    console.log("데이터 다시 받아랑", data);
    localStorage.setItem("token", data.token); // JWT를 로컬 스토리지에 저장
    dispatch(loginSuccess());
  };

  const onClick = (data: SignupFormData) => {
    if (!isIdAvailable) {
      alert("아이디를 다시 확인해주세요.");
      return;
    }

    // 비밀번호 확인 로직
    if (data.password !== data.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 약관 동의 확인
    if (!data.agreeToTerms) {
      alert("약관에 동의해야 합니다.");
      return;
    }

    postSignup(data);

    // 회원가입 후 메인 페이지로 이동
    navigate("/");
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onClick)}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input {...register("id", { required: true })} placeholder="아이디" />
          <Button
            type="button"
            onClick={() => checkIdAvailability(watch("id"))}
          >
            아이디 중복체크
          </Button>
        </div>
        {idMessage ? (
          <PassMessage>{idMessage}</PassMessage>
        ) : (
          <ErrorMessage>{idMessage}</ErrorMessage>
        )}
        <Input {...register("name", { required: true })} placeholder="이름" />
        <Input
          {...register("email", { required: true })}
          placeholder="이메일"
          type="email"
        />
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

        <div>
          <input
            type="checkbox"
            {...register("agreeToTerms", { required: true })}
          />
          <label>약관에 동의합니다.</label>
        </div>

        <Input type="submit" value={"회원가입"} />
      </Form>
    </Wrapper>
  );
}
