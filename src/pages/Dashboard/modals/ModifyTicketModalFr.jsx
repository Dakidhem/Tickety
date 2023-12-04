import { useState } from "react";
import axios from "../../../utilities/api";
import { toast } from "react-toastify";
import formatDateForInput from "../../../utilities/formatDate";

export default function ModifyTicketModalFr({ ticket, updateTickets }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(ticket?.title);
  const [description, setDescription] = useState(ticket?.description);
  const [deadline, setDeadline] = useState(ticket?.deadline);
  console.log(ticket);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/tickets/fr-update/${ticket.id}`, {
        title,
        description,
        deadline,
      });

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
  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/tickets/download-attachment/${ticket.id}`,
        {
          responseType: "blob", // Specify the response type as 'blob'
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a link element and trigger a click to start the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `attachment.zip`; // You can set the desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading attachment:", error);
    }
  };

  return (
    <>
      <button
        className="block max-w-sm px-6 py-4 border rounded-lg shadow  bg-gray-800 border-gray-700 hover:bg-gray-700"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <div className="flex justify-between items-center ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
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
        <p className="font-normal text-gray-400 ">{ticket?.description}</p>
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
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="assigned"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Assigné à
                      </label>
                      <input
                        disabled
                        type="text"
                        id="assigned"
                        name="assigned"
                        value={ticket.assigned_to}
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
                        className="mt-1 p-2 w-full border rounded-md"
                        required
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
                      id="description"
                      name="description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      value={description}
                      rows="4"
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Remarques
                    </label>
                    <textarea
                      disabled
                      id="notes"
                      name="notes"
                      value={ticket.notes}
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
                      onChange={(e) => {
                        setDeadline(e.target.value);
                      }}
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formatDateForInput(deadline)}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          for="file-upload"
                          className="relative cursor-pointer text-white rounded-md font-medium bg-gray-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          {ticket.attachment !== null ? (
                            <button onClick={handleDownload}>
                              Télécharger le fichier .zip joint
                            </button>
                          ) : (
                            <span className="py-2 px-4">
                              Il n'y a aucun fichier joint
                            </span>
                          )}

                          <input
                            disabled
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
                      onClick={handleSubmit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
                    >
                      Modifier
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
