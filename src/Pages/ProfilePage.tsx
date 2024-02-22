import Navbar from "../Components/Navbar";
import Profile from "../features/user/components/Profile";

export default function ProfilePage() {
  return <Navbar title="Your Profile" Child={<Profile />} />;
}
