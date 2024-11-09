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

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route path="/users" element={<Users />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calls" element={<Calls />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
