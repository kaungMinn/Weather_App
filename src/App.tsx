import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import WeatherDashboard from "./pages/WeatherDashboard";
import CityPage from "./pages/CityPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/city/:cityName" element={<CityPage />} />
          </Routes>
        </DashboardLayout>
        <Toaster richColors />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App