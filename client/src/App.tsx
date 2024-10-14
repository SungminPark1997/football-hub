// App.tsx

import { Provider } from "react-redux";
import store from "./store";
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
  height: 110vh;

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
