import React from "react";

const Notification = ({ notification }) => {
  return (
    <div
      className={
        notification.is_read
          ? "bg-gray-700 py-2 px-4 rounded"
          : "bg-blue-700 py-2 px-4 rounded"
      }
    >
      <p className="text-white">{notification.message}</p>
    </div>
  );
};

export default Notification;
