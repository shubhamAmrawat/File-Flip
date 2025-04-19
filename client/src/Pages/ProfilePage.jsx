import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import { AppContext } from "../Context/appContext";
import { ArrowLeft, LogOut } from "lucide-react";

const ProfilePage = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-rose-500 transition"
            title="Go back"
          >
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Account Information
          </h2>
        </div>
      </div>

      <main className="flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1 border-r border-rose-100 pr-4">
            <ul className="space-y-4 text-gray-700 font-medium flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <li
                  onClick={() => setActiveTab("profile")}
                  className={`text-center  rounded-lg px-3 py-2 cursor-pointer transition ${
                    activeTab === "profile"
                      ? "bg-rose-500 text-white font-semibold "
                      : "hover:bg-rose-100 bg-rose-50 text-rose-600 "
                  }`}
                >
                  My Profile
                </li>
                <li
                  onClick={() => setActiveTab("security")}
                  className={`text-center  rounded-lg px-3 py-2 cursor-pointer transition ${
                    activeTab === "security"
                      ? "bg-rose-500 text-white font-semibold"
                      : "hover:bg-rose-100 bg-rose-50 text-rose-600"
                  }`}
                >
                  Security
                </li>
              </div>
              <li
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center justify-center gap-2 hover:bg-red-100 text-red-600 hover:text-red-800 px-3 py-2 rounded-lg cursor-pointer transition"
              >
                <LogOut size={18} /> Logout
              </li>
            </ul>
          </aside>

          {/* Main Section */}
          <section className="md:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-slate-100 p-6 rounded-xl grid gap-6">
                <div>
                  <label className="block text-gray-600 text-sm">
                    Full Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {userData?.name || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm">Email</label>
                  <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    {userData?.email || "N/A"}
                    {userData?.isAccountVerified ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
                        Verified
                      </span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md animate-pulse">
                        Not Verified
                      </span>
                    )}
                  </p>
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
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle logout logic here
                  setShowLogoutConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
