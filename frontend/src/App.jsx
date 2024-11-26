import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Home from "./home/Home";
import Users from "./users/Users";
import Chats from "./chats/Chats";
import Contacts from "./contacts/Contacts";
import Profile from "./profile/Profile";
import Calls from "./calls/Calls";
import Setting from "./settings/Settings";
import { useSelector } from "react-redux";
import Transparent_Loader from "./components/Transparent_Loader";

import ProtectedRouteForLogin from "../protectedRoutes/ProtectedRouteForLogin";
import ProtectedRoute_IfLoginNavigateToHome from "../protectedRoutes/ProtectedRoute_IfLoginNavigateToHome";

import CallSending from "./AudioCallComponents/CallSending";

import CallComming from "./AudioCallComponents/CallComming";
import AppFunctionProvider from "./AppFunctionProvider";

const App = () => {
  const { isLoading } = useSelector((state) => state.user);

  const { isCallComing, isCallSending } = useSelector((state) => state.call);

  return (
    <>
      <AppFunctionProvider>
        <>
          {!isCallComing && <CallSending />}
          {!isCallSending && <CallComming />}
          {isLoading ? (
            <Transparent_Loader className="bg-darkbg_2" />
          ) : (
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}

                <Route
                  path="/signin"
                  element={
                    <ProtectedRoute_IfLoginNavigateToHome>
                      <Login />
                    </ProtectedRoute_IfLoginNavigateToHome>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <ProtectedRoute_IfLoginNavigateToHome>
                      <Register />
                    </ProtectedRoute_IfLoginNavigateToHome>
                  }
                />

                {/* Protected Parent Route */}
                {/* Child Routes under Protected Parent */}
                <Route
                  path="/"
                  element={
                    <ProtectedRouteForLogin>
                      <Home />{" "}
                    </ProtectedRouteForLogin>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRouteForLogin>
                      <Users />{" "}
                    </ProtectedRouteForLogin>
                  }
                />
                <Route
                  path="/chats"
                  element={
                    <ProtectedRouteForLogin>
                      <Chats />{" "}
                    </ProtectedRouteForLogin>
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <ProtectedRouteForLogin>
                      <Contacts />{" "}
                    </ProtectedRouteForLogin>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRouteForLogin>
                      <Profile />{" "}
                    </ProtectedRouteForLogin>
                  }
                />
                <Route
                  path="/calls"
                  element={
                    <ProtectedRouteForLogin>
                      <Calls />{" "}
                    </ProtectedRouteForLogin>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRouteForLogin>
                      <Setting />{" "}
                    </ProtectedRouteForLogin>
                  }
                />
              </Routes>
            </BrowserRouter>
          )}
        </>
      </AppFunctionProvider>
    </>
  );
};

export default App;
