import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { loginSuccess, logout } from "./features/user/authSlice";
import { RootState } from "./store";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  height: 20%;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 30px;
`;
const Logbutton = styled.div`
  cursor: pointer;
`;
export default function Home() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const clickLogin = () => {
    if (isLogin) {
      dispatch(logout());
    } else {
      dispatch(loginSuccess());
      nagivate("/login");
    }
  };
  return (
    <Wrapper>
      <Header>
        <Title>Football Hub</Title>
        <Logbutton onClick={clickLogin}>
          {isLogin ? "로그아웃" : "로그인"}
        </Logbutton>
      </Header>
    </Wrapper>
  );
}
