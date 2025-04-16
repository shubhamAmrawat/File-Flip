import React, { useState } from "react";
import NavigationBar from "../Components/NavigationBar.jsx";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import AuthNavbar from "../Components/AuthNavbar.jsx";

const LoginPage = () => {
  const [loginSwitch, setSwitch] = useState("Login");
  const [passVisible, setVisiblity] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start  text-gray-800">
      <AuthNavbar/>
      <div className="w-full max-w-lg mt-12 px-4 sm:px-6 md:px-8 ">
       

        {/* Login/SignUp Switch */}
        <div className="w-full flex gap-2 px-2 py-1 mt-5 items-center justify-evenly bg-gray-100 text-gray-800 rounded-lg border border-gray-300">
          {["Login", "SignUp"].map((type) => (
            <button
              key={type}
              onClick={() => setSwitch(type)}
              className={`w-full py-2 font-medium rounded-md transition-all cursor-pointer ${
                loginSwitch === type
                  ? "bg-rose-200 text-gray-800"
                  : "hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <div className="border border-gray-300 rounded-md p-5 mt-5 bg-white shadow-md">
          <h2 className="font-semibold text-xl sm:text-2xl">
            {loginSwitch === "Login" ? "Login" : "Create an account"}
          </h2>
          <p className="text-sm sm:text-[15px] mt-2">
            {loginSwitch === "Login"
              ? "Enter your email and password to access your account"
              : "Enter your information to create a new account"}
          </p>

          <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
            {loginSwitch === "SignUp" && (
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium">
                  Full Name
                </label>
                <div className="flex items-center border border-rose-300 px-2 py-2 gap-2 mt-1 rounded-md">
                  <User width={20} color="#fda4af" />
                  <input
                    id="fullname"
                    type="text"
                    placeholder="John Doe"
                    className="flex-1 outline-none text-sm"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <div className="flex items-center border border-rose-300 px-2 py-2 gap-2 mt-1 rounded-md">
                <Mail width={20} color="#fda4af" />
                <input
                  id="email"
                  type="email"
                  placeholder="sample@dev.com"
                  className="flex-1 outline-none text-sm"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="flex items-center border border-rose-300 px-2 py-2 gap-2 mt-1 rounded-md">
                <Lock width={20} color="#fda4af" />
                <input
                  id="password"
                  type={passVisible ? "text" : "password"}
                  placeholder="••••••••••"
                  className="flex-1 outline-none text-sm"
                  autoComplete={
                    loginSwitch === "Login"
                      ? "current-password"
                      : "new-password"
                  }
                />
                {passVisible ? (
                  <EyeOff
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
              <div className="flex justify-end mt-2">
                <a
                  href="/forgot-password"
                  className="text-sm text-rose-500 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="bg-rose-500 rounded-md py-2 text-base font-medium text-white hover:bg-rose-600 transition"
            >
              {loginSwitch}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
