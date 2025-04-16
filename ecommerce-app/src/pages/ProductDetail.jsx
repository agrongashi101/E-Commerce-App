import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PumaImage from '../assets/images/puma.jpg';

const imageMap = {
  'puma.jpg': PumaImage,
};

const productData = [
  { id: 1, name: 'Patika', price: 49.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 2, name: 'Patika', price: 29.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 3, name: 'Patika', price: 39.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 4, name: 'Patika', price: 49.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 5, name: 'Patika', price: 29.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 6, name: 'Patika', price: 39.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 7, name: 'Patika', price: 49.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 8, name: 'Patika', price: 29.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 9, name: 'Patika', price: 39.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 10, name: 'Patika', price: 49.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
  { id: 11, name: 'Patika', price: 29.99, image: 'puma.jpg', description: 'Këpucë sportive komode.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = productData.find(p => p.id === parseInt(id));
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    setCart([...cart, product]);
    alert(`"${product.name}" u shtua në shportë`);
  };

  if (!product) return <h2>Produkti nuk u gjet</h2>;

  const imageSrc = imageMap[product.image] || PumaImage;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={imageSrc} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p className="price">€{product.price}</p>
        <p className="description">{product.description}</p>
        <button onClick={addToCart}>Shto në Shportë</button>
      </div>
    </div>
  );
};

export default ProductDetail;
