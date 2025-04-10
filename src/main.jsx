import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ActiveContextProvider } from "./context/ActiveContext";
import { DataContextProvider } from "./context/DataContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ActiveContextProvider>
        <DataContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DataContextProvider>
      </ActiveContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
