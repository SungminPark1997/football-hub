import React from "react";
import { Provider } from "react-redux";
import store from "./store"; // 업데이트된 store 가져오기
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import PostForm from "./component/postform";
import Header from "./component/header";
import Signup from "./signUp";

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #2c3e50;
`;

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <Signup /> },
      { path: "/profile", element: <Profile /> },
      { path: "/write", element: <PostForm /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Wrapper>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Wrapper>
    </Provider>
  );
}

export default App;
