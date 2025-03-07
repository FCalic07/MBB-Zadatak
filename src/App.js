import NavBar from "./components/NavBar";
import ProductContainer from "./components/ProductContainer";
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <>
    <NavBar />
    <Router>
      <Routes>
        <Route path="/" element={<ProductContainer/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
