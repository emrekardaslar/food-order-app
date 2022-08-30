import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./store/auth-context";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }></Route>
          <Route path="/login" element={<LoginPage />}></Route>
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
