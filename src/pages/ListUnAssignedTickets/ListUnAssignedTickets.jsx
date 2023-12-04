import React, { useState, useEffect } from "react";
import axios from "../../utilities/api"; // Adjust the import path as needed
import { toast } from "react-toastify";

const ListUnAssignedTickets = () => {
  const [unassignedTickets, setUnassignedTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/tickets/unassigned")
      .then((response) => {
        setUnassignedTickets(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Fr Assistant tickets:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTicket = async (ticketId) => {
    try {
      // Assign the ticket to the currently logged-in user
      await axios
        .patch(`/tickets/assign/${ticketId}`)
        .then((response) => {
          toast.success("Ticket assigné avec succès");
        })
        .catch((error) => {
          toast.error("Un problème est survenue");
        });
      // Refresh the list of unassigned tickets
      const response = await axios.get("/tickets/unassigned");
      setUnassignedTickets(response.data);
    } catch (error) {
      console.error("Error handling ticket:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-8 w-full">
      <h2 className="text-2xl font-semibold mb-4">
        Liste des tickets non attribués
      </h2>
      {loading ? (
        <p>Chargement...</p>
      ) : setUnassignedTickets.length === 0 ? (
        <p>Nous n'avons trouvé aucun tickets</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {unassignedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="block max-w-sm px-6 py-4  border  rounded-lg shadow  bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                {ticket.title}
              </h5>
              <p className="font-normal  text-gray-400 ">
                {ticket.description}
              </p>
              <button
                onClick={() => handleTicket(ticket.id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                S'occuper du ticket
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListUnAssignedTickets;
