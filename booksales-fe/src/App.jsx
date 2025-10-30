import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import PublicLayout from "./layouts/public";
import AdminLayout from "./layouts/admin";

// Public pages
import Home from "./pages/public";
import Books from "./pages/public/books";
import BookShow from "./pages/public/books/BookShow";

// Auth
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// Admin pages
import Dashboard from "./pages/admin/index.jsx";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import AdminBooksEdit from "./pages/admin/books/edit";
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import AuthorEdit from "./pages/admin/authors/edit";
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import GenreEdit from "./pages/admin/genres/edit";
import AdminTransactions from "./pages/admin/transactions";
import TransactionEdit from "./pages/admin/transactions/edit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<BookShow />} />
        </Route>

        {/* AUTH */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* ADMIN WRAPPER (Logged-in siapapun) */}
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard bisa diakses semua role */}
          <Route index element={<Dashboard />} />

          {/* CRUD: ADMIN-ONLY */}
          <Route
            path="books"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="books/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <BookCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="books/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminBooksEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="authors"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminAuthors />
              </ProtectedRoute>
            }
          />
          <Route
            path="authors/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AuthorCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="authors/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AuthorEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="genres"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminGenres />
              </ProtectedRoute>
            }
          />
          <Route
            path="genres/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <GenreCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="genres/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <GenreEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="transactions"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminTransactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="transactions/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <TransactionEdit />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
