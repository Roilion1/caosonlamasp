import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 4; 

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7033/api/product');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi lấy sản phẩm:', err);
        setError('Không thể tải sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      return;
    }

    try {
      const loggedInUser = JSON.parse(localStorage.getItem('userInfo')) || null;
      if (loggedInUser) {
        const cartItem = {
          productId: productId,
          quantity: 1,
        };

        await axios.post('https://localhost:7033/api/Cart', cartItem, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        alert('Đã thêm vào giỏ hàng!');
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert('Không thể thêm vào giỏ hàng!');
    }
  };

  // Tính toán sản phẩm để hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p className="text-center">Đang tải sản phẩm...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Tính toán tổng số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Danh sách sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <div key={product.id} className="border rounded-xl shadow-md p-4 bg-white flex flex-col items-center">
            <div className="overflow-hidden rounded-lg w-full h-48">
              <img
                src={`https://localhost:7033/Images/${product.avata}`}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 transform hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-lg font-bold text-red-500 mb-3">{product.price.toLocaleString()}₫</p>
            <div className="flex justify-between w-full gap-2">
              <Link to={`/orderdetail/${product.id}`} className="bg-blue-500 text-white px-3 py-2 rounded flex-1 text-center hover:bg-blue-600">
                <FaEye className="inline mr-1" /> Xem
              </Link>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="bg-green-500 text-white px-3 py-2 rounded flex-1 hover:bg-green-600"
              >
                <FaShoppingCart className="inline mr-1" /> Thêm
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nút chuyển trang */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;