import RootLayout from "../Containers/Roots";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../Containers/HomePage";
import ContactPage from "../Containers/ContactPage";
import Voitures from "./Voitures/Voitures";
import SignUp from "./SignUp/SignUp";
import Login from "./LoginForm/LoginForm";
import Reservation from "./Reservation/Reservation";
import { useCallback, useState } from "react";
import { AuthContext } from "../Containers/AuthContext";
import ProfilePage from "../Containers/ProfilePage";
import ReviewPage from "../Containers/ReviewPage";
import SuccursalePage from "../Containers/SuccursalePage";

const routerLogout = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/voitures",
        element: <Voitures />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/review",
        element: <ReviewPage />,
      },
      {
        path: "/succursales",
        element: <SuccursalePage />,
      },
      {
        path: "/reservations",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const routerLogin = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/voitures",
        element: <Voitures />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/review",
        element: <ReviewPage />,
      },
      {
        path: "/reservations",
        element: <Reservation />,
      },
      {
        path: "/succursales",
        element: <SuccursalePage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Navigate to="/" replace />,
  },
]);
const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback((uid, token, isAdmin) => {
    setToken(token);
    setUserId(uid);
    setIsAdmin(isAdmin);
  });

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  });
  if (!!token) {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
          isAdmin: isAdmin,
        }}
      >
        <RouterProvider router={routerLogin} />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <RouterProvider router={routerLogout} />
    </AuthContext.Provider>
  );
};

export default App;
