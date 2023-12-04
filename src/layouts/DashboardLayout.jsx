import { Outlet } from "react-router-dom";
import PrivateRoute from "../utilities/PrivateRoute";
const DashboardLayout = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};

export default DashboardLayout;
