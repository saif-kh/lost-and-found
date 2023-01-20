import { createBrowserRouter } from "react-router-dom";
import DragAndDrop from "./components/DragAndDrop";
import UserLayout from "./components/layouts/UserLayout";
import CheckPostModel from "./components/models/CheckPostModel";
import PostFormModel from "./components/models/PostFormModel";
import Login from "./pages/connexion/Login";
import SignUp from "./pages/connexion/SignUp";
import AllPosts from "./pages/Interfaces/AllPosts";
import CreatePost from "./pages/Interfaces/CreatePost";
import MyPosts from "./pages/Interfaces/MyPosts";
import Post from "./pages/Interfaces/Post";
import SavedPosts from "./pages/Interfaces/SavedPosts";
import Test from "./pages/Interfaces/Test";
import UpdateProfile from "./pages/Interfaces/UpdateProfile";
import LandingPage from "./pages/landing-page/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <AllPosts />,
      },
      {
        path: "my-posts",
        element: <MyPosts />,
      },
      {
        path: "post/:type/:id",
        element: <Post />,
      },
      {
        path: "update",
        element: <UpdateProfile />,
      },
      {
        path: "saved-posts",
        element: <SavedPosts />,
      },
    ],
  },
]);

export default router;
