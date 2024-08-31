import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const CartShop = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: token
        }
      });

      if (response.data && response.data.status === 'success') {
        setCartItems(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
        setTotalItems(response.data.data.numOfCartItems);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const handleQuantityChange = async (itemId, change) => {
    const updatedItems = cartItems.map(item =>
      item._id === itemId
        ? { ...item, count: Math.max(1, item.count + change) }
        : item
    );
    setCartItems(updatedItems);

    try {
      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
        { count: Math.max(1, updatedItems.find(item => item._id === itemId).count) },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      fetchCartData();
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
        headers: {
          token: token
        }
      });

      if (response.data && response.data.status === 'success') {
        setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
        fetchCartData();
      } else {
        console.error('Failed to remove item:', response.data);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleClearCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: token
        }
      });

      if (response.data && response.data.status === 'success') {
        setCartItems([]);
        setTotalPrice(0);
        setTotalItems(0);
      } else {
        console.error('Failed to clear cart:', response.data);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <div className="cart-shop">
      <div className="cart-header">
        <h2>Cart Shop</h2>
        <button className="btn btn-primary">Check Out</button>
      </div>
      <div className="cart-summary">
        <span>Total Price: <span className="highlight">{totalPrice}</span></span>
        <span>Total Number of Items: <span className="highlight">{totalItems}</span></span>
      </div>
      {cartItems.map(item => (
        <div key={item._id} className="cart-item">
          <img src={item.product.imageCover} alt={item.product.title} />
          <div className="item-details">
            <h3>{item.product.title}</h3>
            <p>{item.price} EGP</p>
            <button className="btn btn-remove" onClick={() => handleRemoveItem(item._id)}>Remove</button>
          </div>
          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
            <span>{item.count}</span>
            <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
          </div>
        </div>
      ))}
      <button className="btn btn-clear" onClick={handleClearCart}>Clear Your Cart</button>
    </div>
  );
};

export default CartShop;
