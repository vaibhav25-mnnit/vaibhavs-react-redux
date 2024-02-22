import Navbar from "../Components/Navbar";
import Login from "../features/user/components/Login";

export default function LoginPage() {
  return <Navbar title="Login" Child={<Login />} />;
}
