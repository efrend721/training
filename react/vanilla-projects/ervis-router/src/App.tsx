import { BrowserRouter, Navigate, Route } from "react-router-dom";
import "./App.css";
import { PrivateRoutes, PublicRoutes } from "./models";
import { AuthGuard, RolGuard } from "./guards";
import { RoutesWithNotFound } from "./utilities";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Logout } from "./components/Logout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ToastContainer } from "./components/ToastContainer";
import { Roles } from "./models/roles";
import Dashboard from "./pages/Private/Private";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Provider store={store}>
            <BrowserRouter>
              <Logout />
              <ToastContainer />
              <RoutesWithNotFound>
                <Route
                  path="/"
                  element={<Navigate to={PrivateRoutes.PRIVATE} />}
                />
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route element={<AuthGuard privateValidation={true} />}>
                  <Route
                    path={`${PrivateRoutes.PRIVATE}/*`}
                    element={<Private />}
                  />
                </Route>
                <Route element={<RolGuard rol={Roles.ADMIN} />}>
                  <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
                </Route>
              </RoutesWithNotFound>
            </BrowserRouter>
          </Provider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
