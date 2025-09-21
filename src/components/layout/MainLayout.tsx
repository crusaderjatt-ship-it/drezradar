import { Outlet } from "react-router-dom";
import Header from "./Header";
import { MadeWithDyad } from "@/components/made-with-dyad";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <Outlet />
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default MainLayout;