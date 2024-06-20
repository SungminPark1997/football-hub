import { useState } from "react";
import { Navigate } from "react-router-dom";
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
  const [isLogin, setLoigin] = useState(false);
  return (
    <Wrapper>
      <Header>
        <Title>Football Hub</Title>
        <Logbutton>{isLogin ? "로그아웃" : "로그인"}</Logbutton>
      </Header>
    </Wrapper>
  );
}
