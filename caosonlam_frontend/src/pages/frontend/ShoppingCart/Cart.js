import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`https://localhost:7033/api/Cart`);
        setCartItems(response.data || []);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const price = Number(item.productPrice) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleQuantityChange = (id, quantity) => {
    if (isNaN(quantity) || quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`https://localhost:7033/api/Cart/${id}`);
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', {
      state: { cartItems, totalPrice },
    });
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">🛒 Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex items-center border-b pb-4 space-x-4">
                <img
                  src={`https://localhost:7033/Images/${item.productImage}`}
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.productName || 'Sản phẩm không tên'}</h3>
                  <p className="text-gray-600">{formatCurrency(Number(item.productPrice) || 0)}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-16 border rounded p-1"
                    />
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">
              Tổng giá: {formatCurrency(totalPrice)}
            </h3>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleProceedToCheckout}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
