import React from 'react';

// Importo fotot manualisht
import PumaImage from '../assets/images/puma.jpg';
// Mund të shtosh më shumë: import NikeImage from '../assets/images/nike.jpg';

const imageMap = {
  'puma.jpg': PumaImage,
  // 'nike.jpg': NikeImage,
};

const Product = ({ product, addToCart }) => {
  if (!product) {
    return <p>Product data is missing.</p>;
  }

  const imageSrc = imageMap[product.image] || PumaImage; // fallback nëse s'gjendet

  return (
    <div className="product-card">
      <img src={imageSrc} alt={product.name || "Product"} style={{ width: '100%', borderRadius: '8px' }} />
      <h3>{product.name || "Unknown Product"}</h3>
      <p>Çmimi: €{product.price || "N/A"}</p>
      
    </div>
  );
};

export default Product;
