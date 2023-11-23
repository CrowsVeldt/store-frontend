import { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorElement/ErrorElement.jsx";
import { AuthContext } from "./context/AuthContext";
import Root from "./pages/Root";
import About from "./pages/public/About";
import Blog from "./pages/public/Blog.jsx";
import Checkout from "./pages/public/Checkout.jsx";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login.jsx";
import Catalog, { getAllProducts } from "./pages/public/Products/Catalog";
import Profile from "./pages/private/Profile";
import Register from "./pages/public/Register";
import SupportPage from "./pages/public/Support.jsx";
import AutoLogin from "./utils/AutoLogin";
import RequireAuth from "./utils/RequireAuth";
import SingleProductPage, {
  loader as productLoader,
} from "./pages/public/Products/ProductPage.jsx";
import AdminProductPage from "./pages/admin/AdminProductPage.jsx";
import PasswordReset from "./pages/public/PasswordReset.jsx";
import ForgotPassword from "./pages/public/ForgotPassword.jsx";

function App() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route element={<AutoLogin />}>
          <Route index loader={getAllProducts} element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/forgot-password/:id" element={<ForgotPassword />} />
          <Route element={<RequireAuth user={user} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
            path="/product/:productId"
            element={<SingleProductPage />}
            loader={productLoader}
          />
          <Route path="*" element={<div>Not Found 404</div>} />
          <Route
            path="/admin/product/:productId"
            element={<AdminProductPage />}
          />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
