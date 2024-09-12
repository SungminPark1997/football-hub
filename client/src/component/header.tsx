import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { logout, loginSuccess } from "../features/user/authSlice";
import { RootState } from "../store";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./sidebar";

const HeaderWrapper = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #2c3e50;
`;

const Title = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

const UserMenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const Logbutton = styled.div`
  cursor: pointer;
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #444;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const WriteButton = styled.div`
  cursor: pointer;
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #444;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const IconButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
`;

const StyledMenuIcon = styled(MenuIcon)`
  cursor: pointer;
`;

const Header = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSideBar, setSidebar] = useState(false);

  const clickLogin = () => {
    if (isLogin) {
      dispatch(logout());
      localStorage.removeItem("token"); // 로그아웃 시 JWT 삭제
    } else {
      navigate("/login");
    }
  };

  const clickSignUp = () => {
    navigate("/signUp");
  };

  const clickMenuIcon = () => {
    setSidebar(!isSideBar);
  };

  const clickWriteButton = () => {
    navigate("/write");
  };

  const clickTitle = () => {
    navigate("/");
  };

  return (
    <HeaderWrapper>
      <StyledMenuIcon onClick={clickMenuIcon} fontSize="large" />
      <Title onClick={clickTitle}>Football Hub</Title>
      <UserMenuBox>
        {isLogin ? (
          <>
            <Logbutton onClick={clickLogin}>로그아웃</Logbutton>
            <WriteButton onClick={clickWriteButton}>글쓰기</WriteButton>
            <IconButton onClick={() => navigate("/profile")}>
              <FaUserCircle size={24} />
            </IconButton>
          </>
        ) : (
          <>
            <Logbutton onClick={clickLogin}>로그인</Logbutton>
            <Logbutton onClick={clickSignUp}>회원가입</Logbutton>
          </>
        )}
      </UserMenuBox>
      <SideBar isVisible={isSideBar}></SideBar>
    </HeaderWrapper>
  );
};

export default Header;
