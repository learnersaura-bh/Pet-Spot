import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Signup } from "./Auth/SignUp";
import { Login } from "./Auth/Login";
import { Cart } from "./pages/Cart/Cart";
import { WishList } from "./pages/WishList/WishList";
import { ProductDetail } from "./pages/Product Detail/ProductDetail";
import { Checkout } from "./pages/Checkout/Checkout";
import { RequiresAuth } from "./Components/RequireAuth";
import { Navbar } from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouteNotFound } from "./pages/RouteNotfound/RouteNotFound";
import { Footer } from "./Components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Navbar />

      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <WishList />
            </RequiresAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequiresAuth>
              <Checkout />
            </RequiresAuth>
          }
        />
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
