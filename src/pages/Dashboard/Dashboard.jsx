import React, { useEffect, useState } from "react";
import axios from "../../utilities/api"; // You need to install axios if not already installed
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { getUserRole } from "../../utilities/auth";
import ModifyTicketModalDz from "./modals/ModifyTicketModalDz";
import AddTicketModal from "./modals/AddTicketModal";
import ModifyTicketModalFr from "./modals/ModifyTicketModalFr";

const DashBoard = () => {
  const userRole = getUserRole();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketsToShow, setTicketsToShow] = useState([]);

  const updateTickets = async () => {
    setLoading(true);
    axios
      .get("/tickets/")
      .then((response) => {
        setTickets(response.data);
        setTicketsToShow(filterTickets(response.data).all);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Fr Assistant tickets:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    updateTickets();
  }, []);
  const filterTickets = (tickets) => {
    return {
      all: tickets,
      pending: tickets.filter((ticket) => ticket.assigned_to === null),
      inProgress: tickets.filter(
        (ticket) => ticket.assigned_to !== null && ticket.finished === false
      ),
      completed: tickets.filter(
        (ticket) => ticket.assigned_to !== null && ticket.finished === true
      ),
    };
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-8 w-full py-6 px-6">
      <div className="flex w-100 justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mes tickets</h2>
        {userRole === "FR_ASSISTANT" ? (
          <AddTicketModal updateTickets={updateTickets} />
        ) : (
          <Link
            to="unassignedtickets"
            className="bg-green-700 text-white py-2 px-4 rounded hover:text-green-200 flex items-center gap-2"
          >
            Tickets à résoudre
          </Link>
        )}
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : tickets.length === 0 ? (
        <p>Nous n'avons trouvé aucun tickets</p>
      ) : (
        <div className="w-full">
          <div className="flex items-center justify-center gap-2 mb-8 w-full">
            <button
              className="bg-indigo-400 text-white py-2 px-4 rounded text-sm"
              onClick={() => {
                setTicketsToShow(filterTickets(tickets).all);
              }}
            >
              Tout
            </button>
            <button
              className="bg-blue-400 text-white py-2 px-4 rounded text-sm"
              onClick={() => {
                setTicketsToShow(filterTickets(tickets).pending);
              }}
            >
              En attente
            </button>
            <button
              onClick={() => {
                setTicketsToShow(filterTickets(tickets).inProgress);
              }}
              className="bg-gray-700 text-white py-2 px-4 rounded text-sm"
            >
              En cours
            </button>
            <button
              onClick={() => {
                setTicketsToShow(filterTickets(tickets).completed);
              }}
              className="bg-green-700 text-white py-2 px-4 rounded text-sm"
            >
              Terminer
            </button>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {userRole === "FR_ASSISTANT"
              ? ticketsToShow.map((ticket) => (
                  <ModifyTicketModalFr
                    key={ticket.id}
                    ticket={ticket}
                    updateTickets={updateTickets}
                  />
                ))
              : ticketsToShow.map((ticket) => (
                  <ModifyTicketModalDz
                    key={ticket.id}
                    ticket={ticket}
                    updateTickets={updateTickets}
                  />
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
