import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import HeaderPage from "./components/Header";
import ForgetPasswordPage from "./pages/Auth/ForgetPassword";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ResetPasswordPage from "./pages/Auth/ResetPasssword";
import UserRoot from "./pages/User/UserRoot";
import UserDashboard from "./pages/User/UserDashboard";
import UserCourses from "./pages/User/UserCourses";
import UserSettings from "./pages/User/UserSettings";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HeaderPage />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
        </Route>
        {/* User */}
        <Route element={<UserRoot />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/my-courses/:courseType" element={<UserCourses />} />
          <Route path="/settings" element={<UserSettings />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
