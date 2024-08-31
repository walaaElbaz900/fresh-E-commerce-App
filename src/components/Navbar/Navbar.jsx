import React from 'react';
import './Navbar.css';

const Navbar = () => {
  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Optionally, redirect to the login page or home page
    window.location.href = '/login'; // Or '/home' based on your route
  };

  return (
    <div className='navbar container-width'>
      <div className="logo">
        <i className="fa-solid fa-cart-shopping"></i>
        fresh
      </div>

      <div className="navlinks-container">
        <a href="/" className="navlinks">
          Home
        </a>
        <a href="cart" className="navlinks">
          Cart
        </a>
        <a href="wishlist" className="navlinks">
          Wish List
        </a>
        <a href="products" className="navlinks">
          Products
        </a>
        <a href="categories" className="navlinks">
          Categories
        </a>
        <a href="brands" className="navlinks">
          Brands
        </a>
      </div>

      <div className="navbar-btns">
        <button className="cart-btn" onClick={() => window.location.href = '/cart'}>
            <i className="fa-solid fa-cart-shopping"></i>
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <button className="bars-icon">
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  );
}

export default Navbar;
