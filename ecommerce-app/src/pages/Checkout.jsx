import React, { useEffect, useState } from 'react';
import PumaImage from '../assets/images/puma.jpg';

const imageMap = {
  'puma.jpg': PumaImage,
};

const getProductClass = (cartLength) => {
  if (cartLength === 1) return 'single-product';
  if (cartLength === 2) return 'two-products';
  return '';
};

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const updatedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));

    setCart(updatedCart);
    updateTotal(updatedCart);
  }, []);

  const updateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(totalPrice);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  const changeQuantity = (productId, delta) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  const handleCheckout = () => {
    const order = {
      items: cart,
      total: total.toFixed(2),
      date: new Date().toISOString(),
    };

    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
      .then(res => res.json())
      .then(() => {
        alert("Porosia u dërgua me sukses!");
        localStorage.removeItem('cart');
        window.location.href = "/";
      })
      .catch(err => {
        console.error("Gabim gjatë checkout:", err);
        alert("Dështoi dërgimi i porosisë");
      });
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Shporta është bosh.</p>
      ) : (
        <div className={`products ${getProductClass(cart.length)}`}>
          {cart.map((item, index) => {
            const imageSrc = imageMap[item.image] || PumaImage;
            return (
              <div key={index} className="product-card">
                <img
                  src={imageSrc}
                  alt={item.name}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <h3>{item.name}</h3>
                <p>Çmimi për copë: €{item.price.toFixed(2)}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                  <span>Sasia: {item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                </div>

                <p><strong>Totali: €{(item.price * item.quantity).toFixed(2)}</strong></p>
                <button onClick={() => removeFromCart(item.id)}>Fshi</button>
              </div>
            );
          })}
        </div>
      )}
      <h3>Total për pagesë: €{total.toFixed(2)}</h3>
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        style={{
          opacity: cart.length === 0 ? 0.5 : 1,
          cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        Dërgo Porosinë
      </button>

    </div>
  );
};

export default Checkout;
