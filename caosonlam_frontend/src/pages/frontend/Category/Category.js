import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('https://localhost:7033/api/Category')
      .then(response => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Điều hướng đến trang sản phẩm của danh mục đã chọn
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Danh mục sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(category => (
          <div
            key={category.id}
            className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            onClick={() => handleCategoryClick(category.id)} 
          >
            <div className="w-full h-auto overflow-hidden">
              <img
                src={`https://localhost:7033/Images/${category.avata}`}
                alt={category.name}
                className="w-full h-auto object-cover transition-transform duration-300 transform hover:scale-110"
              />
            </div>
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-xl font-semibold mt-2 mb-2 text-center">{category.name}</h3>
              <p className="text-gray-600 text-sm text-center">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
