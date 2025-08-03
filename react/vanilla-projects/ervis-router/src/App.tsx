import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Private } from "./pages/Private";
import { Login } from "./pages/Login";
import { PrivateRoutes, PublicRoutes } from "./models";
import { AuthGuard } from "./guards";
import { RoutesWithNotFound } from "./utilities";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to={PrivateRoutes.PRIVATE} />}
                />
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route element={<AuthGuard />}>
                  <Route
                    path={`${PrivateRoutes.PRIVATE}/*`}
                    element={<Private />}
                  />
                </Route>
              </Routes>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
