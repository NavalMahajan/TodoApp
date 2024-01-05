import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componenets/home";
import LoginForm from "./componenets/login";
import Toastr from "./componenets/toast";
import Baner from "./componenets/baner";
import About from "./componenets/about";
import TodoState from "./context/Todos/TodoState";
import Footer from "./componenets/footer";
function App() {
  return (
    <>
      <TodoState>
        <BrowserRouter>
          <Header />
          <Toastr />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Baner />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<LoginForm />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </TodoState>
    </>
  );
}

export default App;
