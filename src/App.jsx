import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import HeaderPage from "./components/Header";
import ForgetPasswordPage from "./pages/Auth/ForgetPassword";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ResetPasswordPage from "./pages/Auth/ResetPasssword";
import DashboardPage from "./pages/DashboardPages/Dashboard";
import DashboardLayout from "./pages/DashboardPages/DashboardLayout";
import CreatePage from "./pages/DashboardPages/CreatePage";
import SelectTheme from "./pages/PresentationPages/SelectTheme";
import Presentation from "./pages/PresentationPages/Presentation";
import Trash from "./pages/DashboardPages/Trash/Trash";

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
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/trash" element={<Trash />} />
        </Route>
        <Route
          path="/presentation/:id/select-theme"
          element={<SelectTheme />}
        />
        <Route path="/presentation/:id" element={<Presentation />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
