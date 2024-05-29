import { RouterProvider } from "./router";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider />
      <ToastContainer theme="colored" closeOnClick />
    </>
  );
}

export default App;
