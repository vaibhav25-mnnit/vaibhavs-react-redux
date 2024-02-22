import { useEffect } from "react";
import { router } from "./Router";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "./features/user/userSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const data = {
      userId: id,
      token: token,
    };

    if (id !== null) dispatch(setUser(data));
  });

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
