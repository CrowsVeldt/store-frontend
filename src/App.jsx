import { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "./api/axios.js";
import { AuthContext } from "./context/AuthContext";
import About from "./pages/public/About";
import AddProduct from "./pages/admin/AddProductPage.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AutoLogin from "./utils/AutoLogin";
import Blog from "./pages/public/Blog.jsx";
import Catalog from "./pages/public/Products/Catalog";
import Contact from "./pages/public/Contact";
import EditOrder from "./pages/admin/EditOrderPage.jsx";
import EditProduct, {
  loader as categoryLoader,
} from "./pages/admin/EditProductPage.jsx";
import EditUser from "./pages/admin/EditUserPage.jsx";
import ErrorPage from "./pages/ErrorElement/ErrorElement.jsx";
import ForgotPassword from "./pages/public/ForgotPassword.jsx";
import Login from "./pages/public/Login.jsx";
import UserOrders from "./pages/private/Orders.jsx";
import PasswordReset from "./pages/public/PasswordReset.jsx";
import Profile from "./pages/private/Profile";
import PurchasePage from "./pages/public/PurchasePage.jsx";
import Register from "./pages/public/Register";
import RejectedPage from "./pages/public/RejectedPage.jsx";
import RequireAuth from "./utils/RequireAuth";
import Root from "./pages/Root";
import SingleProductPage, {
  loader as productLoader,
} from "./pages/public/Products/ProductPage.jsx";
import SuccessPage from "./pages/public/SuccessPage.jsx";
import SupportPage from "./pages/public/Support.jsx";

export const getAllProducts = async () => {
  try {
    const {
      data: { products },
    } = await axios.get("/products/customers/all");
    return products;
  } catch (error) {
    toast.error("Failed to load products");
    return console.error(error);
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
          <Route
            path="/product/:productId"
            element={<SingleProductPage />}
            loader={productLoader}
          />
          <Route element={<RequireAuth user={user} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/admin" element={<AdminPage />}>
              <Route
                path="products"
                loader={getAllProducts}
                element={<AdminProducts />}
              />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="edit/order" element={<EditOrder />} />
              <Route path="edit/user" element={<EditUser />} />
              <Route
                path="edit/product"
                loader={categoryLoader}
                element={<EditProduct />}
              />
              <Route
                path="add/product"
                loader={categoryLoader}
                element={<AddProduct />}
              />
            </Route>
          </Route>
          <Route path="*" element={<div>Not Found 404</div>} />
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
