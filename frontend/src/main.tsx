import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContextProvider.tsx";
import { SocketContextProvider } from "./context/SocketContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
