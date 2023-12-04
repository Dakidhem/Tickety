import React, { useEffect, useState } from "react";
import axios from "../../../utilities/api";
import Notification from "../components/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationsModal = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch notifications from the server
    axios
      .get("/notifications/")
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  const markNotificationsAsSeen = () => {
    // Mark notifications as seen by making a PUT request
    axios
      .put("/notifications/")
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error marking notifications as seen:", error);
      });
  };

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          markNotificationsAsSeen();
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-sm"
      >
        <FontAwesomeIcon icon={faBell} />
      </button>

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative my-6 mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[80vw] outline-none focus:outline-none bg-gray-800 p-8">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t">
                  <h2 className="text-2xl font-semibold mb-4">Notification</h2>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white opacity-8 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {notifications.length === 0 ? (
                  <span>Vous n'avez aucune notification</span>
                ) : (
                  <div className="mt-4 space-y-4">
                    {notifications.reverse().map((notification) => (
                      <Notification
                        key={notification.id}
                        notification={notification}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default NotificationsModal;
