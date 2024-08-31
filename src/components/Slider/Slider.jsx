import React, { useEffect, useState } from 'react';
import './Slider.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching the categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='category-slider-container'>
      {categories.map((category) => (
        <div key={category._id} className="category-slider-item">
          <img src={category.image} className='category-slider-image' alt={category.name} />
          <h2>{category.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Categories;
