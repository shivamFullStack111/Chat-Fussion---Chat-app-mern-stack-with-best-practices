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
import NewMessage_Notification from "./components/NewMessage_Notification";
import FAQPage from "./helpPages/FAQPage";
import Help from "./helpPages/Help";
import TandP from "./helpPages/TandP";
import NotFoundPage from "./notfoundpage/NotFoundPage";

const App = () => {
  const { isLoading, user } = useSelector((state) => state.user);
  const { isChatOpen } = useSelector((state) => state.chat);

  const { isCallComing, isCallSending } = useSelector((state) => state.call);

  return (
    <>
      {user?.showNotifications && !isChatOpen && <NewMessage_Notification />}
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
                <Route path="/faq" element={<FAQPage />} />
                <Route
                  path="/help"
                  element={
                    <ProtectedRouteForLogin>
                      <Help />{" "}
                    </ProtectedRouteForLogin>
                  }
                />
                <Route
                  path="/t&p"
                  element={
                    <ProtectedRouteForLogin>
                      <TandP />{" "}
                    </ProtectedRouteForLogin>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          )}
        </>
      </AppFunctionProvider>
    </>
  );
};

export default App;
