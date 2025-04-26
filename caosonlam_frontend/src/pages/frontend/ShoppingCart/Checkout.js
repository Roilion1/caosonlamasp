// Checkout.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await axios.get('https://localhost:7033/api/User/customerInfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserInfo(res.data);
            } catch (error) {
                console.error('❌ Lỗi khi lấy thông tin khách hàng:', error);
                alert('Không thể lấy thông tin khách hàng. Vui lòng thử lại!');
            }
        };

        fetchCustomerInfo();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    // Bỏ qua tất cả các kiểm tra
    const orderData = {
        userId: parseInt(userId),
        totalAmount: totalPrice,
        orderDetails: cartItems.map(item => ({
            productId: item.product?.id || item.productId,
            quantity: item.quantity,
            unitPrice: Number(item.product?.price || item.productPrice || 0)
        }))
    };

    try {
        console.log('Order Data:', orderData); // Kiểm tra dữ liệu đơn hàng
        const orderRes = await axios.post('https://localhost:7033/api/Order', orderData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (orderRes.status === 200 || orderRes.status === 201) {
            localStorage.setItem('lastOrder', JSON.stringify(orderData));
            alert('✅ Thanh toán thành công!');
            // Xóa từng sản phẩm trong giỏ hàng
            for (const item of cartItems) {
                await axios.delete(`https://localhost:7033/api/Cart/${item.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            navigate('/');
        } else {
            alert('Thanh toán thất bại. Vui lòng thử lại!');
        }
    } catch (error) {
        console.error('❌ Lỗi khi thanh toán:', error.response ? error.response.data : error.message);
        alert('Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.');
    }
};

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">💳 Xác nhận Thanh toán</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-2xl font-bold mb-4">🛒 Danh sách sản phẩm</h3>
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center border-b py-4">
                        <img
                            src={`https://localhost:7033/Images/${item.product?.avata || item.productImage}`}
                            alt={item.product?.name || item.productName}
                            className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                            <p className="font-semibold">{item.product?.name || item.productName || 'Sản phẩm không tên'}</p>
                            <p>{formatCurrency(Number(item.product?.price || item.productPrice || 0))} x {item.quantity}</p>
                        </div>
                    </div>
                ))}
                <div className="mt-6">
                    <h3 className="text-xl font-bold">Tổng giá: {formatCurrency(totalPrice)}</h3>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition duration-300"
                    >
                        Xác nhận thanh toán
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;