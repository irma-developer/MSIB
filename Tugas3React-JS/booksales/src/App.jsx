import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/index.jsx";     // <- karena filenya index.jsx
import Team from "./Pages/Team.jsx";
import Contact from "./Pages/Contact.jsx";
import Book from "./Pages/Books.jsx";
import Login from "./Pages/auth/login/index.jsx";
import Register from "./Pages/auth/register/index.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Book />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
