import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import styled from "styled-components";
import { loginSuccess, logout } from "./features/user/authSlice";
import { RootState } from "./store";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import SideBar from "./component/sidebar";
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 30px;
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
export default function Home() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSideBar, setSidebar] = useState(false);

  const clickLogin = () => {
    if (isLogin) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  const clickMenuIcon = () => {
    setSidebar(!isSideBar);
  };
  const clickWriteButton = () => {
    navigate("/write");
  };

  return (
    <Wrapper>
      <Header>
        <StyledMenuIcon onClick={clickMenuIcon} fontSize="large" />

        <Title>Football Hub</Title>
        <UserMenuBox>
          <Logbutton onClick={clickLogin}>
            {isLogin ? "로그아웃" : "로그인"}
          </Logbutton>
          {isLogin && (
            <>
              {" "}
              <WriteButton onClick={clickWriteButton}>글쓰기</WriteButton>
              <IconButton onClick={() => navigate("/profile")}>
                <FaUserCircle size={24} />
              </IconButton>
            </>
          )}
        </UserMenuBox>
      </Header>{" "}
      <SideBar isVisible={isSideBar} />
    </Wrapper>
  );
}
