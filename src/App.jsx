import { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "./api/axios.js";
import ErrorPage from "./pages/ErrorElement/ErrorElement.jsx";
import { AuthContext } from "./context/AuthContext";
import Root from "./pages/Root";
import About from "./pages/public/About";
import Blog from "./pages/public/Blog.jsx";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login.jsx";
import Catalog from "./pages/public/Products/Catalog";
import Profile from "./pages/private/Profile";
import Register from "./pages/public/Register";
import SupportPage from "./pages/public/Support.jsx";
import AutoLogin from "./utils/AutoLogin";
import RequireAuth from "./utils/RequireAuth";
import SingleProductPage, {
  loader as productLoader,
} from "./pages/public/Products/ProductPage.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import AdminUsers, {
  loader as usersLoader,
} from "./pages/admin/AdminUsers.jsx";
import AdminOrders, {
  loader as ordersLoader,
} from "./pages/admin/AdminOrders.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import PasswordReset from "./pages/public/PasswordReset.jsx";
import ForgotPassword from "./pages/public/ForgotPassword.jsx";
import PurchasePage from "./pages/public/PurchasePage.jsx";
import SuccessPage from "./pages/public/SuccessPage.jsx";
import RejectedPage from "./pages/public/RejectedPage.jsx";

export const getAllProducts = async () => {
  try {
    const {
      data: { products },
    } = await axios.get("/products/customers/all");
    return products;
  } catch (error) {
    toast.error("Failed to load products");
    return error;
  }
};

function App() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route element={<AutoLogin />}>
          <Route index loader={getAllProducts} element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/successful-payment" element={<SuccessPage />} />
          <Route path="/rejected-payment" element={<RejectedPage />} />
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
          <Route path="/admin" element={<AdminPage />}>
            <Route
              path="orders"
              loader={ordersLoader}
              element={<AdminOrders />}
            />
            <Route
              path="products"
              loader={getAllProducts}
              element={<AdminProducts />}
            />
            <Route path="users" loader={usersLoader} element={<AdminUsers />} />
          </Route>
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
