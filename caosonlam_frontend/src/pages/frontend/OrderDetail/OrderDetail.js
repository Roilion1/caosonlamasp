import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://localhost:7033/api/Product/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError('Không thể tải chi tiết sản phẩm.');
        console.error(err);
      }
    };
    fetchProduct();
  }, [productId]);

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10 text-gray-500">Đang tải chi tiết sản phẩm...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <img
          src={`https://localhost:7033/Images/${product.avata}`}
          alt={product.name}
          className="w-full md:w-1/2 h-auto rounded-lg shadow"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 text-base">{product.description}</p>
          <p className="text-2xl font-semibold text-red-500">{product.price.toLocaleString()} ₫</p>
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Chi tiết sản phẩm</h3>
            <p className="text-gray-500 italic">
              Đây là một sản phẩm chất lượng cao, phù hợp với mọi nhu cầu sử dụng. Sản phẩm được đảm bảo chính hãng và có chính sách đổi trả rõ ràng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
