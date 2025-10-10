import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TrendDetails from "./pages/TrendDetails";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // New import
import TermsOfService from "./pages/TermsOfService"; // New import
import About from "./pages/About"; // New import
import { ThemeProvider } from "./components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import { SessionContextProvider } from "./components/SessionContextProvider";
import Header from "./components/Header";
import Footer from "./components/Footer"; // New import
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" attribute="class">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HelmetProvider>
          <BrowserRouter>
            <SessionContextProvider>
              <div className="flex flex-col min-h-screen"> {/* Added flex container for sticky footer */}
                <Header />
                <main className="flex-grow"> {/* Main content area */}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/trend/:platform/:dress_type" element={<TrendDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* New route */}
                    <Route path="/terms-of-service" element={<TermsOfService />} /> {/* New route */}
                    <Route path="/about" element={<About />} /> {/* New route */}

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/admin" element={<Admin />} />
                    </Route>

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer /> {/* Render the Footer */}
              </div>
            </SessionContextProvider>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;