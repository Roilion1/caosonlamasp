// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AuthService from '../../../services/AuthService';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { Email: email, Password: password };

        try {
            const response = await AuthService.login(userData);
            const token = response.token;

            // Lưu token vào localStorage
            localStorage.setItem('token', token);

            // Gọi API lấy thông tin người dùng chi tiết
            const userInfoRes = await axios.get('https://localhost:7033/api/User/customerInfo', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem('userInfo', JSON.stringify(userInfoRes.data));
            localStorage.setItem('userId', userInfoRes.data.id); // Lưu userId

            alert('✅ Bạn đã đăng nhập thành công!');
            navigate('/');
        } catch (error) {
            console.error('❌ Lỗi đăng nhập:', error);
            setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 via-white to-blue-100">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Đăng Nhập</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Đăng Nhập
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Chưa có tài khoản?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Đăng ký ngay
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;