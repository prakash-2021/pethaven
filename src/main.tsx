import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import "./index.scss";
import SmoothScrollProvider from "./Provider/SmoothScrollProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SmoothScrollProvider>
        <MantineProvider>
          <App />
        </MantineProvider>
      </SmoothScrollProvider>
    </QueryClientProvider>
  </StrictMode>
);
