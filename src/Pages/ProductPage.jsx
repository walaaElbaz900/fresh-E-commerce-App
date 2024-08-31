import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css'; // Add CSS styles if needed
import Navbar from '../components/Navbar/Navbar';

const ProductPage = () => {
  const { productId } = useParams(); // Get the productId from URL parameters
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.data);
        } else {
          console.error('Error fetching the product:', response.status);
        }
      } catch (error) {
        console.error('Error fetching the product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    // Handle add to cart functionality
    console.log('Added to cart:', product);
  };

  const handleAddToWishlist = () => {
    // Handle add to wishlist functionality
    console.log('Added to wishlist:', product);
  };

  if (!product) {
    return <div>Loading...</div>; // Or handle loading state here
  }

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <img className="product-image" src={product.imageCover} alt={product.title} />
          <p className="product-price">Price: {product.price}EGp</p>
          <p className="product-description">{product.description}</p>
          <div className="product-buttons">
            <button className="btn btn-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn btn-wishlist" onClick={handleAddToWishlist}>                <i className="fa-solid fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
