import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddTicket from "./pages/AddTicket/AddTicket";
import ListUnAssignedTickets from "./pages/ListUnAssignedTickets/ListUnAssignedTickets";
import TicketInformation from "./pages/TicketInformation/TicketInformation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="addticket" element={<AddTicket />} />
            <Route
              path="unassignedtickets"
              element={<ListUnAssignedTickets />}
            />
            <Route path="tickets/:id" element={<TicketInformation />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
