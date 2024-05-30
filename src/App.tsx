import { RouterProvider } from "./router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider />
        <ToastContainer theme="colored" closeOnClick />
      </PersistGate>
    </Provider>
  );
}

export default App;
