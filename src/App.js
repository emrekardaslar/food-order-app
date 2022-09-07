import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./store/auth-context";
import PrivateRoute from "./components/PrivateRoute";
import OrdersPage from "./pages/OrdersPage";
import CartProvider from "./store/CartProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Container
                  className="d-flex align-items-center justifty-content-center"
                  style={{ minHeight: "100vh" }}
                >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <LoginPage />
                </div>
                </Container>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <Container
                  className="d-flex align-items-center justifty-content-center"
                  style={{ minHeight: "100vh" }}
                >
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <RegisterPage />
                  </div>
                </Container>
              }
            ></Route>
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrdersPage />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
