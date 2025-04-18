import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home";
import AboutPage from "./pages/about";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";
import CustomerBookingsPage from "./pages/bookings";
import ManagerPage from "./pages/manager";
import NotFoundPage from "./pages/notFound";
import VenueDetailsPage from "./pages/venue";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/venue/:id" element={<VenueDetailsPage />} />
        <Route path="/bookings" element={<CustomerBookingsPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
