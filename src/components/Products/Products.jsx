import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching the categories:', error);
      }
    };

    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers: {
            'token': token,
          },
        });
        const data = await response.json();
        setWishlist(data.data.map(item => item._id));
      } catch (error) {
        console.error('Error fetching the wishlist:', error);
      }
    };

    fetchCategories();
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const method = wishlist.includes(productId) ? 'DELETE' : 'POST';
      const url = `https://ecommerce.routemisr.com/api/v1/wishlist${method === 'DELETE' ? `/${productId}` : ''}`;
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: method === 'POST' ? JSON.stringify({ productId }) : undefined,
      });
  
      if (response.ok) {
        const result = await response.json();
        setWishlist(prevWishlist => 
          method === 'POST' 
            ? [...prevWishlist, productId]
            : prevWishlist.filter(id => id !== productId)
        );
        console.log('Wishlist updated:', result);
      } else {
        const errorData = await response.json();
        console.error('Failed to update wishlist:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };
  
  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product added to cart:', result);
      } else {
        const errorData = await response.json();
        console.error('Failed to add product to cart:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (ratingsAverage) => {
    const roundedRating = Math.round(ratingsAverage);
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`star ${index < roundedRating ? 'filled' : ''}`}>
            &#9733;
          </span>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='category-container Container-Spacing Container-Width'>
        {filteredCategories.map((category) => (
          <div key={category._id} className="category-cards">
            <Link to={`/products/${category._id}`} className="category-link">
              <img src={category.imageCover} className='Onepic' alt={category.title} />
              <div className="category-info">
                <h2>{category.title}</h2>
                <p>Price: {category.price} EGp</p>
                <div className="rating">
                  {renderStars(category.ratingsAverage)}
                </div> 
              </div>
            </Link>
            <div className="button-group">
              <button
                className={`wishlist-button ${wishlist.includes(category._id) ? 'red' : ''}`}
                onClick={() => addToWishlist(category._id)}
              >
                <i className="fa-solid fa-heart"></i>
              </button>
              <button
                className="cart-button"
                onClick={() => addToCart(category._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;