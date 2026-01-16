import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
