import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { Link } from 'react-router-dom';

const Home = () => {
  const products = [
    { id: 1, name: 'Patika', price: 49.99, image: 'puma.jpg' },
    { id: 2, name: 'Patika', price: 29.99, image: 'puma.jpg' },
    { id: 3, name: 'Patika', price: 39.99, image: 'puma.jpg' },
    { id: 4, name: 'Patika', price: 29.99, image: 'puma.jpg' },
    { id: 5, name: 'Patika', price: 59.99, image: 'puma.jpg' },
    { id: 6, name: 'Patika', price: 29.99, image: 'puma.jpg' },
    { id: 7, name: 'Patika', price: 49.99, image: 'puma.jpg' },
    { id: 8, name: 'Patika', price: 29.99, image: 'puma.jpg' },
    { id: 9, name: 'Patika', price: 39.99, image: 'puma.jpg' },
    { id: 10, name: 'Patika', price: 39.99, image: 'puma.jpg' },
    { id: 11, name: 'Patika', price: 39.99, image: 'puma.jpg' },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`"${product.name}" u shtua në shportë`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>E-Commerce</h1>
      <input
        type="text"
        placeholder="Kërko produkt..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="products">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Product product={product} addToCart={addToCart} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
