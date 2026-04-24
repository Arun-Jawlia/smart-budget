import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import {  Route, Routes } from "react-router-dom";

export const AllRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};
