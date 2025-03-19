import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
  ],
  {
    future: {
      v7_startTransition: true, // Opt into the v7 behavior for startTransition
      v7_relativeSplatPath: true, // Opt into the v7 behavior for splat routes
    },
  }
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
