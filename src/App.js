import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import ProductContainer from "./components/ProductContainer/ProductContainer";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ProductProvider } from "./contexts/ProductContext";

function App() {
  return (
    <Router>
      <ProductProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductContainer />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
