import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../utilities/api";

export default function AddTicketModal({ updateTickets }) {
  const [showModal, setShowModal] = useState(false);
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const handleChange = (e) => {
    console.log(e.target.name);
    setTicket((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(ticket);
    try {
      const response = await axios.post("/tickets/", ticket);

      if (!response.data) {
        toast.error("Une erreur est survenue");
      } else {
        updateTickets();
        toast.success("Ticket ajouté avec succès");
        setShowModal(false);
      }

      return response.data;
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };
  return (
    <>
      <button
        className="bg-green-700 text-white py-2 px-4 rounded hover:text-green-200 flex items-center gap-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Ajouter un ticket
        <FontAwesomeIcon icon={faSquarePlus} />
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative my-6 mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[80vw] outline-none focus:outline-none bg-gray-800 p-8">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t">
                  <h2 className="text-2xl font-semibold mb-4">
                    Ajouter un ticket
                  </h2>
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

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Titre
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={ticket.title}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={ticket.description}
                      onChange={handleChange}
                      rows="4"
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="deadline"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={ticket.deadline}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div className="flex justify-end items center gap-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
