import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Signup from "./features/user/components/Signup";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<ProfilePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
    </>
  )
);
