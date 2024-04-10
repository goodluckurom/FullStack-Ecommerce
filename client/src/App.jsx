import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductsDetailsPage,
  ProfilePage,
  CheckoutPage,
  CreateShopPage,
  ShopLoginPage,
  ShopActivationPage,
} from "./routes/Routes";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
} from "./shopRoutes/ShopRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { useEffect } from "react";
import store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useSelector } from "react-redux";
import { loadSeller } from "./redux/actions/seller";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    //runs the loaduser function and saves the user in the store on load
    store.dispatch(loadUser()).catch((error) => {
      console.error("Error loading user:", error);
    });
    //runs the get seller request and saves the seller in the redux store on load
    store.dispatch(loadSeller()).catch((error) => {
      toast.error(error);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="w-full h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/shop-activation/:activation_token"
            element={<ShopActivationPage />}
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductsDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          {/**  shop routes */}
          <Route path="/shop-create" element={<CreateShopPage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />{" "}
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
