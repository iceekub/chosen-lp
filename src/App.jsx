import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Inquire from "./pages/Inquire";
import About from "./pages/About";
import { Privacy, Terms } from "./pages/Legal";
import DeleteAccount from "./pages/DeleteAccount";
import ScrollToTop from "./components/ScrollToTop";

// Route table shared by the client (BrowserRouter, below) and the
// build-time prerenderer (StaticRouter, src/entry-server.jsx), so every
// route is emitted as a real static HTML file that resolves with HTTP 200
// instead of falling through to GitHub Pages' 404.html.
export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/inquire" element={<Inquire />} />
      <Route path="/waitlist" element={<Navigate to="/inquire" replace />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/delete-account" element={<DeleteAccount />} />
    </Routes>
  </>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
