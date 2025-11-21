import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, email, password }) => {
    // validate user inputs
    if (!handleInputError({ fullName, email, password })) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        credentials: "include", // Required for cookies!!
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      // console.log("Data received by backend when SIGNUP: \n", data);

      // If backend sends an error
      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      // Success
      toast.success(data.message || "Account created!");

      // setuser to browser localStorage
      localStorage.setItem("omni-user", JSON.stringify(data.user));
      setAuthUser(data.user); // store user
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

// ---------- Client-side validation ----------
function handleInputError({ fullName, email, password }) {
  if (!fullName || !email || !password) {
    toast.error("All fields are required!");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters!");
    return false;
  }

  return true;
}
