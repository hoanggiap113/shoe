"use client";
import { SettingOutlined, BellFilled, LogoutOutlined } from "@ant-design/icons";


export default function Header(){
    return (
    <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
      {/* Greeting */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Hello, Admin 👋</h2>
        <p className="text-sm text-gray-500">Have a nice day</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button
          className="relative text-gray-500 hover:text-yellow-500 transition-colors"
          aria-label="Notifications"
        >
          <BellFilled className="text-2xl" />
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button
          className="text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Settings"
        >
          <SettingOutlined className="text-2xl " />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=5"
            alt="user avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">Admin</p>
            <p className="text-xs text-gray-400">admin@gmail.com</p>
          </div>
        </div>

        {/* Logout */}
        <button
          className="text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Logout"
        >
          <LogoutOutlined className="text-2xl" />
        </button>
      </div>
    </header>
  );
}