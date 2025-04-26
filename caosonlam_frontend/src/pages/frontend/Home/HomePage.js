import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import Banner from './Banner';

const HomePage = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = 'http://localhost:5000'; // Đổi cổng theo ASP.NET backend của bạn

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newRes, saleRes, bestRes, catRes] = await Promise.all([
          axios.get(`${baseURL}/api/products/new?limit=8`),
          axios.get(`${baseURL}/api/products/sale?limit=10`),
          axios.get(`${baseURL}/api/products/bestseller?limit=8`),
          axios.get(`${baseURL}/api/categories`)
        ]);

        setNewProducts(newRes.data || []);
        setSaleProducts(saleRes.data || []);
        setBestSellerProducts(bestRes.data || []);
        setCategories(catRes.data || []);
      } catch (err) {
        setError('Không thể tải dữ liệu từ máy chủ.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Đang tải trang...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Banner />
      <div className="container mx-auto p-6">
        {/* Sản phẩm mới */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Sản phẩm mới</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.length > 0 ? (
              newProducts.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-md bg-white flex flex-col">
                  <div className="flex-1 overflow-hidden">
                    <img
                      className="w-full h-48 object-cover"
                      src={`${baseURL}/images/products/${product.image}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="p-4 text-center flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-xl font-bold">{product.price}đ</p>
                    </div>
                    <Link to={`/product/${product.id}`} className="text-blue-500">
                      <FaEye className="text-xl" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm mới.</p>
            )}
          </div>
        </section>

        {/* Sản phẩm khuyến mãi */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Sản phẩm khuyến mãi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {saleProducts.length > 0 ? (
              saleProducts.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-md bg-white flex flex-col">
                  <div className="flex-1 overflow-hidden">
                    <img
                      className="w-full h-48 object-cover"
                      src={`${baseURL}/images/products/${product.image}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-xl font-bold text-red-500">{product.salePrice}đ</p>
                    <p className="text-gray-500">{product.categoryName}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm khuyến mãi.</p>
            )}
          </div>
        </section>

        {/* Sản phẩm bán chạy */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Sản phẩm bán chạy</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellerProducts.length > 0 ? (
              bestSellerProducts.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-md bg-white flex flex-col">
                  <div className="flex-1 overflow-hidden">
                    <img
                      className="w-full h-48 object-cover"
                      src={`${baseURL}/images/products/${product.image}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-xl font-bold">{product.price}đ</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm bán chạy.</p>
            )}
          </div>
        </section>

        {/* Danh mục sản phẩm */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Danh mục sản phẩm</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link to={`/category/${category.id}`} key={category.id}>
                  <div className="border rounded-lg shadow-md bg-white p-4 text-center">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                </Link>
              ))
            ) : (
              <p>Không có danh mục nào.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
