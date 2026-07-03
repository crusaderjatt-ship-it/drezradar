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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import About from "./pages/About";
import AmazonSale from "./pages/AmazonSale";
import TrendAnalysis from "./pages/TrendAnalysis";
import { ThemeProvider } from "./components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import { SessionContextProvider } from "./components/SessionContextProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow" id="main-content" role="main">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/amazon-sale" element={<AmazonSale />} />
                    <Route path="/trend-analysis" element={<TrendAnalysis />} />
                    <Route path="/trend/:platform/:dress_type" element={<TrendDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/about" element={<About />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/profile" element={<Profile />} />
                    </Route>
                    {/* Admin Protected Route */}
                    <Route element={<ProtectedRoute adminOnly={true} />}>
                      <Route path="/admin" element={<Admin />} />
                    </Route>

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </SessionContextProvider>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;