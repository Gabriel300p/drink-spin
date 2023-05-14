"use client";

import FetchCards from "@/components/FetchCards";
import Teste from "@/components/Teste";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchCards />
      {/* <Teste /> */}
    </QueryClientProvider>
  );
}
