import React, { useContext, useState } from "react";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import AuthNavbar from "../Components/AuthNavbar.jsx";
import axios from 'axios'
import { AppContext } from "../Context/appContext.jsx";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [loginSwitch, setSwitch] = useState("Login");
  const [passVisible, setVisiblity] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({}); 
  const navigate = useNavigate(); 
  const { backendUrl, setIsLoggedIn , getUserData } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {}; 

    //common validations

    if (!email) {
      newErrors.email="Email Is Required"
    }else if(!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid Email Format"; 
    }

    if (!password) {
      newErrors.password = "Password Is Required";
    } else if(password.length<6) {
      newErrors.password = "Password must be at least 6 characters long ";
    }

    if (loginSwitch === 'SignUp' && !name) newErrors.name = "Name is Required"; 

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors); 
      return; 
    }
    setFormErrors({});
    try {
      console.log(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);

      axios.defaults.withCredentials = true;

      if (loginSwitch === "Login") {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
         const { data } = await axios.post(backendUrl + "/api/auth/signup", {
           name, 
           email,
           password,
         });

         if (data.success) {
           setIsLoggedIn(true);
           getUserData(); 
           navigate("/");
         } else {
           toast.error(data.message);
         }
      }
    } catch (error) {
       toast.error(error.message);
    }

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start  text-gray-800">
      <AuthNavbar />
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="flex-1 outline-none text-sm"
                    autoComplete="name"
                  />
                </div>
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">
                    {formErrors.name}
                  </p>
                )}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sample@dev.com"
                  className="flex-1 outline-none text-sm"
                  autoComplete="email"
                />
              </div>
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">
                  {formErrors.email}
                </p>
              )}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">
                  {formErrors.password}
                </p>
              )}
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
              className="bg-rose-500 rounded-md py-2 text-base font-medium text-white hover:bg-rose-600 transition cursor-pointer"
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
