
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Homepage from "./routes/home/Homepage";
import UserProfile from "./routes/profile/UserProfile";
import UpdateProfile from "./routes/updateProfile/UpdateProfileDialog";
import AddProperty from "./routes/properties/AddProperty";

import { singlePageLoader } from "./lib/loaders";
import PropertyItem from "./components/properties/PropertyItem";
import PropertyList from "./components/PropertyList";
import UpdateProperty from "./routes/properties/UpdateProperty";
import ChatOwner from "./components/chat/ChatOwner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "/", element: <Homepage /> },
      { path: "/:id", element: <PropertyItem />, loader: singlePageLoader, },
      { path: "/properties", element: <PropertyList /> },
      
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      { path: "user-profile", element: <UserProfile /> },
      { path: "update-profile", element: <UpdateProfile /> },
      { path: "add-property", element: <AddProperty /> },
      { path: "/update-property/:id", element: <UpdateProperty /> },
      { path: "/chats/:id", element: <ChatOwner /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
