import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Accueil from "./components/accueil/Accueil";
import SignIn from "./components/signin/Signin";
import Login from "./components/login/Login";
import Modifier from "./components/modifier/modifier";
import Offres from "./components/offres/Offres";
import CreateCopie from "./components/createOffer/createCopie";
import MainNavigation from "./components/Navigation/MainNavigation";
import SigninEmployeur from "./components/signin/SignInEmployeur";
import SigninCandidat from "./components/signin/SignInCandidat";
import CreateOffer from "./components/createOffer/createOffer";
import PageOffre from "./components/pageOffre/pageOffre";
import { UserProvider } from "./Context/UserContext";
import { useUser } from "./Context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobApplications from "./components/jobApplications/jobApplications";
import Candidature from "./components/candidatures/Candidature";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useUser();

  if (!user || user.role !== allowedRole) {
    return (
      <div>
        Pour crééer un offre, connectez-vous ou inscrivez-vous en tant que
        entreprise
      </div>
    );
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Accueil /> },
      { path: "/accueil", element: <PageOffre /> },
      { path: "/offres", element: <PageOffre /> },
      { path: "/candidatures", element: <Candidature /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/login", element: <Login /> },
      { path: "/signInEmployeur", element: <SigninEmployeur /> },
      { path: "/signInCandidat", element: <SigninCandidat /> },
      { path: "/JobApplications/:paramValue", element: <JobApplications /> },
      { path: "/modifier/:paramValue", element: <Modifier /> },
      {
        path: "/createOffer",
        element: (
          <ProtectedRoute allowedRole="entreprise">
            <CreateOffer />
          </ProtectedRoute>
        ),
      },
      {
        path: "/createCopie/:paramValue",
        element: (
          <ProtectedRoute allowedRole="entreprise">
            <CreateCopie />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "*", element: <Accueil /> },
]);

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserProvider>
  );
}
