import "./App.css";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import ViewUser from "./components/ViewUser";
import EditUser from "./components/EditUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/view/:id" element={<ViewUser />} />
        <Route path="/update/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
