import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../utils/axiosConfig";
import { ExpenseContextData } from "../Context/ExpenseContextTypes";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setData } = useContext(ExpenseContextData)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({mode: "onChange"});

 const onSubmit = async (data: FormData) => {
  try {
    await axios.post("/auth/login", data, {
      withCredentials: true,
    });

    const userRes = await axios.get("/auth/me", {
      withCredentials: true,
    });

    setData((prev) => ({
      ...prev,
      user: userRes.data.user,
      isAuthenticated: true,
    }));

    navigate("/");
  } catch (err: any) {
    alert(err.response?.data?.message || "Something went wrong");
  }
}; 

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-white via-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-100">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Login to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`mt-2 w-full px-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`mt-2 w-full px-4 py-3 rounded-xl border ${
                errors.password ? "border-red-500" : "border-gray-200"
              } bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="grow border-t border-gray-200"></div>
          <span className="mx-4 text-sm text-gray-400">OR</span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-gray-900 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;