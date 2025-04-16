import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail'; 
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/checkout">Shporta</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;
