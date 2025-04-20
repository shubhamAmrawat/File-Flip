import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import { AppContext } from "../Context/appContext";
import {
  ArrowLeft,
  InfoIcon,
  LockKeyhole,
  LogOut,
  MailCheck,
  MailWarning,
  MapPinCheck,
  User2Icon,
  UserPen,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";

const ProfilePage = () => {
  const { userData, backendUrl, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-otp`);

      if (data.success) {
        toast.success("OTP sent to your email");
        setOtp(userData.verifyOtp);
        setShowOtpField(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, {
        otp,
      });

      if (data.success) {
        toast.success("Email verified successfully!");
        // ⏳ Wait 2 seconds before refreshing + redirecting
        setTimeout(() => {
          window.location.replace("/profile");
        }, 3000); // refresh + redirect
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify OTP");
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        toast.success("Logged Out Successfully");
        setIsLoggedIn(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" flex flex-col   min-h-screen  ">
      <NavigationBar />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-rose-500 transition cursor-pointer"
            title="Go back"
          >
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Account Information
          </h2>
        </div>
      </div>

      <main className="flex flex-col flex-grow items-center justify-start px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1 border-r border-rose-100 pr-4 ">
            <ul className="space-y-4 text-gray-700 font-medium flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <li
                  onClick={() => setActiveTab("profile")}
                  className={`text-center flex items-center  gap-2  rounded-lg px-3 py-2 cursor-pointer transition ${
                    activeTab === "profile"
                      ? "bg-rose-500 text-white font-semibold "
                      : "hover:bg-rose-100 bg-rose-50 text-rose-600 "
                  }`}
                >
                  <UserPen width={20} />
                  My Profile
                </li>
                <li
                  onClick={() => setActiveTab("security")}
                  className={`text-center  flex items-center  gap-2  rounded-lg px-3 py-2 cursor-pointer transition ${
                    activeTab === "security"
                      ? "bg-rose-500 text-white font-semibold"
                      : "hover:bg-rose-100 bg-rose-50 text-rose-600"
                  }`}
                >
                  <LockKeyhole width={20} />
                  Security
                </li>

                {!userData.isAccountVerified && (
                  <li
                    onClick={() => setActiveTab("emailVerify")}
                    className={`text-center  flex items-center  gap-2  rounded-lg px-3 py-2 cursor-pointer transition ${
                      activeTab === "emailVerify"
                        ? "bg-rose-500 text-white font-semibold"
                        : "hover:bg-rose-100 bg-rose-50 text-rose-600"
                    }`}
                  >
                    <MailWarning width={20} />
                    Email Verify
                  </li>
                )}
              </div>
              <li
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-600 px-3 py-2 rounded-lg cursor-pointer transition"
              >
                <LogOut size={18} /> Logout
              </li>
            </ul>
          </aside>

          {/* Main Section */}
          <section className="md:col-span-3">
            {activeTab === "profile" && (
              <div className="grid gap-6">
                {/* 🔐 Verification Status Card */}
                {!userData.isAccountVerified && (
                  <div
                    className={`rounded-xl px-6 py-2 shadow-sm border ${
                      userData?.isAccountVerified
                        ? "bg-green-50 border-green-200"
                        : "bg-yellow-50 border-yellow-200"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-2 flex items-center gap-2 ${
                        userData?.isAccountVerified
                          ? "text-green-700"
                          : "text-yellow-700"
                      }`}
                    >
                      <InfoIcon />
                      Verification Status
                    </h3>
                    <p
                      className={`text-sm ${
                        userData?.isAccountVerified
                          ? "text-green-600"
                          : "text-yellow-700"
                      }`}
                    >
                      {userData?.isAccountVerified
                        ? "Your email has been successfully verified."
                        : "Your email is not verified. Please check your inbox for a verification email or request a new one."}
                    </p>
                  </div>
                )}

                {/* 🧍 Personal Details */}
                <div className="bg-slate-100 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg flex items-center  gap-1 font-semibold text-rose-600 mb-4">
                    <User2Icon width={20} />
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 text-sm">
                        Full Name
                      </label>
                      <p className="text-base font-semibold text-gray-900">
                        {userData?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className=" text-gray-500 text-sm flex items-center gap-2">
                        Email
                        {userData.isAccountVerified === false ? (
                          <span className="text-[10px] border-yellow-200 border flex items-center gap-1 rounded-full px-2 text-red-600 bg-yellow-100">
                            <InfoIcon width={10} />
                            verify email
                          </span>
                        ) : (
                          <span className="text-[10px]  flex items-center gap-1 rounded-full px-2  text-green-600 bg-green-100">
                            <MailCheck width={13} />
                          </span>
                        )}
                      </label>
                      <p className="text-base font-semibold flex items-center gap-2 text-gray-900">
                        <span> {userData?.email || "N/A"} </span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm">
                        Phone
                      </label>
                      <p className="text-base text-gray-800">
                        {userData?.phone || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm">
                        Date of Birth
                      </label>
                      <p className="text-base text-gray-800">
                        {userData?.dob
                          ? new Date(userData.dob).toLocaleDateString()
                          : "Not specified"}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-gray-500 text-sm">Bio</label>
                      <p className="text-base text-gray-800">
                        {userData?.bio || "No bio added yet."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 🌍 Location Details */}
                <div className="bg-slate-100 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg flex items-center gap-1 font-semibold text-rose-600 mb-4">
                    <MapPinCheck width={20} />
                    Location Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-gray-500 text-sm">
                        Country
                      </label>
                      <p className="text-base text-gray-800">
                        {userData?.country || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm">
                        State
                      </label>
                      <p className="text-base text-gray-800">
                        {userData?.state || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm">
                        City
                      </label>
                      <p className="text-base text-gray-800">
                        {userData?.city || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm">
                        Pincode
                      </label>
                      <p className="text-base text-gray-800">
                        {userData?.pincode || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-slate-100 p-6 rounded-xl flex flex-col gap-6">
                <h3 className="text-xl font-semibold text-rose-600">
                  Security Settings
                </h3>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>

                <button className="self-start bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition">
                  Update Password
                </button>
              </div>
            )}

            {activeTab === "emailVerify" && (
              <div className="bg-slate-100 p-6 rounded-xl flex flex-col gap-6 max-w-md">
                <h3 className="text-xl font-semibold text-rose-600">
                  Verify your Email
                </h3>

                {/* Display Email */}
                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={userData?.email}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* Send OTP Button */}
                {!showOtpField && (
                  <button
                    onClick={handleSendOtp}
                    className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 font-medium transition cursor-pointer"
                  >
                    Send OTP
                  </button>
                )}

                {/* OTP Input + Verify Button */}
                {showOtpField && (
                  <>
                    <div>
                      <label className="block text-gray-600 text-sm mb-1">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                        placeholder="Enter the 6 digit OTP sent to your email"
                      />
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 cursor-pointer font-medium transition"
                    >
                      Verify OTP
                    </button>
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleLogout(); // ✅ actually calls the function
                  setShowLogoutConfirm(false); // ✅ closes the popup
                }}
                className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfilePage;
