import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/user/authSlice";
import { RootState } from "./store";
import { useNavigate } from "react-router-dom";

// 스타일 컴포넌트
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  background-color: white;
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 2px solid #3498db;
`;

const Username = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const Email = styled.p`
  font-size: 16px;
  color: #777;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

// 프로필 컴포넌트
export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // 로그아웃 시 토큰 삭제
    navigate("/login");
  };

  const handleEditProfile = () => {
    // 프로필 편집 화면으로 이동
    navigate("/editProfile");
  };

  return (
    <Wrapper>
      <ProfileBox>
        <ProfileImage src="https://via.placeholder.com/120" alt="Profile" />
        <Username>{user?.username || "User Name"}</Username>
        <Email>{user?.email || "user@example.com"}</Email>
        <Button onClick={handleEditProfile}>프로필 편집</Button>
        <Button onClick={handleLogout}>로그아웃</Button>
      </ProfileBox>
    </Wrapper>
  );
}
