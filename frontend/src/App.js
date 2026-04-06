import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import HomePage from "@/pages/HomePage";
import ServicePage from "@/pages/ServicePage";

function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions/:slug" element={<ServicePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
