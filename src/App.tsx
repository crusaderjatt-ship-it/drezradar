import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TrendDetails from "./pages/TrendDetails";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login"; // Import the new Login page
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import { SessionContextProvider } from "./components/SessionContextProvider"; // Import SessionContextProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" attribute="class">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HelmetProvider>
          <BrowserRouter>
            <SessionContextProvider> {/* Wrap routes with SessionContextProvider */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trend/:platform/:dress_type" element={<TrendDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} /> {/* Add the Login route */}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SessionContextProvider>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;