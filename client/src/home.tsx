import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

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
const Logbutton = styled.div``;
export default function Home() {
  const [isLogin, setLogin] = useState(false);
  const nagivate = useNavigate();

  const clickLogin = () => {
    if (isLogin) {
      setLogin(false);
    } else {
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
