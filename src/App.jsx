import "./App.scss";
import { ToastContainer, Bounce } from "react-toastify";

import Header from "./components/Header";
import { Container } from "react-bootstrap";

import AppRoute from "./routes/AppRoute";
function App() {
  return (
    <>
      <Header />
      <Container>
        <AppRoute />
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
