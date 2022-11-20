import About from "./routes/About";
import Notes from "./routes/Notes";
import CreateNote from "./routes/CreateNote";
import Layout from "./routes/Layout";
import Login from "./routes/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextPtovider from "./components/userContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Register from "./routes/Register";
import NoteEdit, { loader as NoteEditLoader } from "./routes/NoteEdit";
import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: "/about",
        element: <About />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: `/edit`,
        element: <NoteEdit />,
      },
      {
        path: "/create",
        loader: NoteEditLoader,
        element: <CreateNote />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default function App() {
  return (
    <UserContextPtovider>
      <RouterProvider router={router} />
    </UserContextPtovider>
  );
}
