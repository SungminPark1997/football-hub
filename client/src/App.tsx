// App.tsx

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import PostForm from "./component/postform";
import Header from "./component/header";
import Signup from "./signUp";
import EditProfile from "./editProfile";
import PostDetail from "./postDetail";
import MatchPredict from "./matchPredict";

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh; /* 부모 요소의 높이를 뷰포트의 높이로 설정 */
  overflow: hidden; /* 부모 요소에서 스크롤 숨기기 */
  background-color: #1a2b3c;
`;

const ContentWrapper = styled.div`
  height: calc(
    100vh - 60px
  ); /* Header의 높이를 빼고 자식 요소가 차지할 높이 설정 */
  overflow-y: auto; /* 자식 요소에 스크롤 추가 */
`;

const Layout = () => (
  <>
    <Header />
    <ContentWrapper>
      <Outlet />
    </ContentWrapper>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/match/:matchId", element: <MatchPredict /> },
      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <Signup /> },
      { path: "/profile", element: <Profile /> },
      { path: "/write", element: <PostForm /> },
      { path: "/editProfile", element: <EditProfile /> },
      { path: "/post/:postId", element: <PostDetail /> },
    ],
  },
]);

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
