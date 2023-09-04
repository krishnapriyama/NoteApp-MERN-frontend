import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

//components
import Login from "./components/login";
import Signin from "./components/signin";
import Notes from "./components/notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/notes"} element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
