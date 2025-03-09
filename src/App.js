import NavBar from "./components/Navigation/NavBar";
import ProductContainer from "./components/ProductContainer/ProductContainer";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ProductProvider } from "./contexts/ProductContext";

function App() {
  return (
    <ProductProvider>

    <NavBar />

    <Router>
      <Routes>
        <Route path="/" element={<ProductContainer/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
      </Routes>
    </Router>
    
    </ProductProvider>
  );
}

export default App;
