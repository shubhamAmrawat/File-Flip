import React, { useState } from "react";
import NavigationBar from "../Components/NavigationBar.jsx";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";

const LoginPage = () => {
  const [loginSwitch, setSwitch] = useState("Login");
  const [passVisible, setVisiblity] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login or signup submission
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <NavigationBar />

      <div className="flex flex-col gap-4 items-center w-full max-w-lg mt-30 px-5">
        <h1 className="text-center font-bold text-4xl">Welcome to File-Flip</h1>
        <p className="text-center font-light text-[15px]">
          Sign in to your account or create a new one
        </p>

        <div className="w-full flex flex-col gap-3 mt-3">
          {/* login/signup switch */}
          <div
            id="loginSwitch"
            className="flex gap-2 px-2 py-1 items-center justify-evenly bg-gray-100 text-gray-800 rounded-lg border border-gray-300"
          >
            <button
              onClick={() => setSwitch("Login")}
              className={`${
                loginSwitch === "Login" ? "bg-rose-100" : "bg-none"
              } flex-1/2 flex items-center justify-center py-1 rounded-lg cursor-pointer transition-colors duration-150`}
            >
              Login
            </button>

            <button
              onClick={() => setSwitch("SignUp")}
              className={`${
                loginSwitch === "SignUp" ? "bg-rose-100" : "bg-none"
              } flex-1/2 flex items-center justify-center py-1 rounded-lg cursor-pointer transition-colors duration-150`}
            >
              Sign Up
            </button>
          </div>

          {/* form */}
          <div className="border border-gray-300 rounded-md p-5 flex-col gap-2">
            <div>
              <h2 className="font-medium text-2xl">
                {loginSwitch === "Login" ? "Login" : "Create an account"}
              </h2>
              <p className="text-[15px] mt-2">
                {loginSwitch === "Login"
                  ? "Enter your email and password to access your account"
                  : "Enter your information to create a new account"}
              </p>
            </div>

            <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
              {loginSwitch === "SignUp" && (
                <div>
                  <label htmlFor="fullname">Full Name</label>
                  <div className="flex items-center border px-2 py-2 gap-2 mt-2 rounded-md">
                    <User width={20} color="gray" />
                    <input
                      id="fullname"
                      type="text"
                      placeholder="John Doe"
                      className="flex-1 outline-none"
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email">Email</label>
                <div className="flex items-center border px-2 py-2 gap-2 mt-2 rounded-md">
                  <Mail width={20} color="gray" />
                  <input
                    id="email"
                    type="email"
                    placeholder="sample@dev.com"
                    className="flex-1 outline-none"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <div className="flex items-center border px-2 py-2 gap-2 mt-2 rounded-md">
                  <Lock width={20} color="gray" />
                  <input
                    id="password"
                    type={passVisible ? "text" : "password"}
                    placeholder="***********"
                    className="flex-1 outline-none"
                    autoComplete={
                      loginSwitch === "Login"
                        ? "current-password"
                        : "new-password"
                    }
                  />
                  {passVisible ? (
                    <EyeClosed
                      onClick={() => setVisiblity(!passVisible)}
                      color="gray"
                      className="cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setVisiblity(!passVisible)}
                      color="gray"
                      className="cursor-pointer"
                    />
                  )}
                </div>
                <div className="flex justify-end items-center mt-3 text-rose-600">
                  <a href="/forgot-password">Forgot your password?</a>
                </div>
              </div>

              <button
                type="submit"
                className="bg-rose-500 rounded-md py-2 text-[20px] font-medium text-gray-50 border hover:bg-rose-600 cursor-pointer"
              >
                {loginSwitch}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
