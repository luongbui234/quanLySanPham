import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Template from "./Template/Template";
import Products from "./pages/Products/Products";
import Favorite from "./pages/Favorite/Favorite";
import { Toaster } from "react-hot-toast";
import History from "./pages/History/History";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Template content={<HomePage />} />} />
          <Route
            path="/products"
            element={<Template content={<Products />} />}
          />
          <Route
            path="/favorite"
            element={<Template content={<Favorite />} />}
          />
          <Route path="/history" element={<Template content={<History />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
