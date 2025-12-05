import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import DashboardUser from "../pages/dashboard/dasboardUser/dashboardUser";
import NotFound from "../pages/404notfound";
import AddUser from "../pages/dashboard/dasboardUser/addUser";
import DetailUser from "@/pages/dashboard/dasboardUser/detailUser";
import UpdateUser from "@/pages/dashboard/dasboardUser/updateUser";
import DashboardMovie from "@/pages/dashboard/movies/dashboardMovie";
import AddMovie from "@/pages/dashboard/movies/addMovie";
import EditMovie from "@/pages/dashboard/movies/editMovie";
import DetailMovie from "@/pages/dashboard/movies/DetailMovie";
import HomeUser from "@/pages/home";
import CartPage from "@/pages/cart";
// import UserTransactions from "@/pages/dashboard/dasboardUser/userTransaction";
import UserTransaction from "@/pages/dashboard/dasboardUser/userTransaction";

export default function Route() {
  const router = createBrowserRouter(
    [
      { path: "/", element: <Login /> },
      { path: "*", element: <NotFound /> },
      { path: "/register", element: <Register /> },
      { path: "/dashboard/user", element: <DashboardUser /> },
      { path: "/dashboard/user/add", element: <AddUser /> },
      { path: "/dashboard/user/:id", element: <DetailUser /> },
      { path: "/dashboard/user/edit/:id", element: <UpdateUser /> },
      { path: "/dashboard/movies", element: <DashboardMovie /> },
      { path: "/dashboard/movies/add", element: <AddMovie /> },
      { path: "/dashboard/movies/edit/:id", element: <EditMovie /> },
      { path: "/dashboard/movies/detail/:id", element: <DetailMovie /> },
      { path: "/home", element: <HomeUser /> },
      { path: "/cart", element: <CartPage /> },
      {
        path: "/dashboard/user/:id/transactions",
        element: <UserTransaction />,
      }
    ]
  );
  return <RouterProvider router={router} />;
}