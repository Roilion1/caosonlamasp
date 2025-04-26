import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaShoppingCart } from 'react-icons/fa';

const CategoryProductPage = () => {
  const { id } = useParams(); 
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token); 
    };

    checkLoginStatus();

    const fetchProducts = async () => {
      try {
        // Lấy danh mục để hiện tên
        const categoryRes = await axios.get(`https://localhost:7033/api/Category/${id}`);
        setCategoryName(categoryRes.data.name);

        // Lấy tất cả sản phẩm
        const res = await axios.get('https://localhost:7033/api/Product');
        const allProducts = res.data;

        // Lọc sản phẩm theo CategoryId
        const filteredProducts = allProducts.filter(product => product.categoryId === parseInt(id));
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Không thể tải sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      return;
    }

    try {
      const cartItem = {
        productId: product.id,
        quantity: 1
      };

      await axios.post('https://localhost:7033/api/Cart', cartItem);
      alert('✅ Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('❌ Lỗi khi thêm vào giỏ hàng:', error);
      alert('❌ Không thể thêm vào giỏ hàng!');
    }
  };

  if (loading) return <p className="text-center">Đang tải sản phẩm...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Sản phẩm trong danh mục: {categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg shadow-md p-4 bg-white">
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
            <div className="flex gap-2">
              <Link to={`/orderdetail/${product.id}`} className="bg-blue-500 text-white px-3 py-2 rounded flex-1 text-center hover:bg-blue-600">
                <FaEye className="inline mr-1" /> Xem
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 text-white px-3 py-2 rounded flex-1 hover:bg-green-600"
              >
                <FaShoppingCart className="inline mr-1" /> Thêm
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductPage;
