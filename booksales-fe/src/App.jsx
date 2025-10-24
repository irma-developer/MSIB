// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// LAYOUT
import PublicLayout from "./layouts/public";

// PUBLIC PAGES
import Home from "./pages/public";
import Books from "./pages/public/books";

// AUTH PAGES
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// ADMIN LAYOUT & PAGES
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin/index.jsx";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
        </Route>

        {/* AUTH */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* ADMIN */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="books">
            <Route index element={<AdminBooks />} />
            <Route path="create" element={<BookCreate />} />
          </Route>
          
        </Route>

        {/* AUTHORS */}


        {/* GENRES */}

      </Routes>
    </BrowserRouter>
  );
}
