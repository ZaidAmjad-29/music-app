import { useData } from "../components/PostProvider";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function usePostActions() {
  const context = useData();
  const navigate = useNavigate();
  const { token } = useParams();
  const { newPassword, setStatusMessage } = useData();

  const handleSignup = async (formData) => {
    try {
      const res = await api.post("/user/register", formData);
      localStorage.setItem("token", res.data.data.token);
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data?.message || "Signup failed");
    }
  };

  const handleSignin = async (form) => {
    try {
      console.log("function call");
      const res = await api.post("/user/login", form);
      localStorage.setItem("token", res.data.data.token);
      console.log(res.data.data.token);
      console.log("login Successful");
      navigate("/explore");
    } catch (err) {
      console.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleResetPassword = async () => {
    try {
      await api.patch(`/user/reset-password/${token}`, {
        password: newPassword,
      });
      setStatusMessage(
        "Password has been reset successfully! Redirecting to login..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatusMessage(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  };

  return {
    ...context,
    handleSignup,
    handleSignin,
    handleResetPassword,
  };
}
