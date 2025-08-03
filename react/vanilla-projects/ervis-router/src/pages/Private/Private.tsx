import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../../models";
import { Home } from "./Home";
import { Dashboard } from "./Dashboard";
import { RoutesWithNotFound } from "../../utilities";

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
      <Route path={PrivateRoutes.HOME} element={<Home />} />
    </RoutesWithNotFound>
  );
}

export default Private;
