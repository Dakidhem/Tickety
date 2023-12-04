import React, { useState } from "react";
import axios from "../../utilities/api";
import { toast } from "react-toastify";

const TicketInformation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/tickets/", {
        title,
        description,
        deadline,
      });

      if (!response.data) {
        toast.error("Failed to add ticket");
      } else {
        toast.success("Ticket added successfully");
      }

      return response.data;
    } catch (error) {
      toast.error("Error adding ticket:", error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketInformation;
