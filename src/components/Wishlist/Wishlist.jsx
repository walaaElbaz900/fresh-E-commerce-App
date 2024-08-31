import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Wishlist.css';


const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const WishlistItem = ({ item, onRemove }) => {
    return (
      <div className="wishlist-item">
        <img src={item.imageCover} alt={item.title} className="item-image" />
        <div className="item-details">
          <h3>{item.title}</h3>
          <p className="price">{item.price} EGP</p>
          <button className="remove-btn" onClick={() => onRemove(item._id)}>Remove</button>
        </div>
        <button className="add-to-cart-btn">Add To Cart</button>
      </div>
    );
  };
  
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers: {
            token: token
          }
        });

        if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
          setWishlist(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (itemId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
        headers: {
          token: token
        }
      });

      if (response.data && response.data.status === 'success') {
        setWishlist(wishlist.filter(item => item._id !== itemId));
      } else {
        console.error('Failed to remove item:', response.data);
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div className="wishlist">
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <WishlistItem key={item._id} item={item} onRemove={handleRemove} />
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
