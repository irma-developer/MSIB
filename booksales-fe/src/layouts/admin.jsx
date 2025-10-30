import { Link, Outlet } from "react-router-dom";
import { getUser, logout, getToken } from "../_service/auth";
import { useMemo } from "react";

export default function AdminLayout() {
  const user = useMemo(() => getUser(), []);
  const isAdmin = user?.role === "admin";

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        {/* Topbar */}
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <Link
                to={"/admin"}
                className="flex items-center justify-between mr-4"
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/logo.svg"
                  className="mr-3 h-8"
                  alt="Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Admin
                </span>
              </Link>
            </div>

            <div className="flex items-center lg:order-2">
              <div className="text-sm text-gray-600 dark:text-gray-300 mr-3">
                {user?.name} · <span className="uppercase">{user?.role}</span>
              </div>
              <Link
                to="/login"
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    await logout();
                  } finally {
                    window.location.href = "/login";
                  }
                }}
                className="px-3 py-1.5 text-sm rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Sign out
              </Link>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            <ul className="space-y-2">
              {/* Selalu tampil */}
              <li>
                <Link
                  to={"/admin"}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ml-1">Dashboard</span>
                </Link>
              </li>

              {/* Menu CRUD — hanya ADMIN */}
              {isAdmin && (
                <>
                  <li>
                    <Link
                      to={"/admin/books"}
                      className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="ml-1">Books</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/admin/authors"}
                      className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="ml-1">Authors</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/admin/genres"}
                      className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="ml-1">Genres</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/admin/transactions"}
                      className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="ml-1">Transactions</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </aside>

        <main className="p-4 md:ml-64 h-auto pt-20">
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-auto px-4 pt-4 pb-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
