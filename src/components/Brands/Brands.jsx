import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Brands.css'

const Brands = () => {
  const [brands, setBrands] = useState([]);


    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
          const data = await response.json();
          setBrands(data.data);
        } catch (error) {
          console.error('Error fetching the categories:', error);
        }
      };
  
      fetchCategories();
    }, []);
  
  return (
    <div>
      <div className="brands-header"><h1>All Brands</h1></div>
      <div className="brand-grid">
        {brands.map(brand => (
          <div key={brand._id} className="brand-item">
            <img src={brand.image} alt={brand.name} />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;