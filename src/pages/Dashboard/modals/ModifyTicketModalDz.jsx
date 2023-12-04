import { useState } from "react";
import axios from "../../../utilities/api";
import { toast } from "react-toastify";
import { getToken } from "../../../utilities/auth";
import formatDateForInput from "../../../utilities/formatDate";

export default function ModifyTicketModalDz({ ticket, updateTickets }) {
  const [showModal, setShowModal] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [notes, setNotes] = useState(ticket.notes);
  const token = getToken();
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const modifyTicket = async (e) => {
    e.preventDefault();

    try {
      // Construct form data to include updated ticket details
      const formData = new FormData();
      if (notes) {
        formData.append("notes", notes);
      }
      if (attachment) {
        formData.append("attachment", attachment);
      }
      // Make a PATCH request to update the ticket
      const response = await axios.patch(
        `/tickets/dz-update/${ticket.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      // Handle the response from the server
      console.log(response.data);
      updateTickets();
      toast.success("Ticket modifié avec succès");
      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error modifying ticket:", error);
      toast.error("Une erreur est survenue");
    }
  };
  const finishTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tickets/finish/${ticket.id}`);
      updateTickets();
      setShowModal(false);
      toast.success("Ticket terminer avec succes");
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.error("Error closing ticket:", error);
    }
  };

  return (
    <>
      <button
        className="block max-w-sm px-6 py-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <div className="flex justify-between items-center ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {ticket?.title}
          </h5>
          {ticket?.assigned_to === null ? (
            <span className="bg-blue-400 text-white py-2 px-4 rounded text-sm">
              En attente
            </span>
          ) : ticket?.finished === false ? (
            <span className="bg-gray-700 text-white py-2 px-4 rounded text-sm">
              En cours
            </span>
          ) : (
            <span className="bg-green-700 text-white py-2 px-4 rounded text-sm">
              Terminer
            </span>
          )}
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400 ">
          {ticket?.description}
        </p>
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
                    Modifier le ticket
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

                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Titre
                    </label>
                    <input
                      disabled
                      type="text"
                      id="title"
                      name="title"
                      value={ticket.title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Assigné à
                      </label>
                      <input
                        disabled
                        type="text"
                        id="title"
                        name="title"
                        value={ticket.assigned_to}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Date de création
                      </label>
                      <input
                        disabled
                        type="text"
                        id="title"
                        name="title"
                        value={formatDateForInput(ticket.created_at)}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Description
                    </label>
                    <textarea
                      disabled
                      id="description"
                      name="description"
                      value={ticket.description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Remarques
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
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
                      disabled
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formatDateForInput(ticket.deadline)}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          for="file-upload"
                          className="relative cursor-pointer text-white rounded-md font-medium bg-gray-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span className="py-2 px-4">
                            Ajouter un ficher .Zip
                          </span>
                          <input
                            onChange={handleFileChange}
                            accept=".zip"
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items center gap-2">
                    <button
                      onClick={modifyTicket}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={finishTicket}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
                    >
                      Terminer
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
