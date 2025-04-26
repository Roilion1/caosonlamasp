import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const LayoutBackend = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '', phone: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState({ success: '', error: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const generateToken = (email) => `${email}-token`;

  useEffect(() => {
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('fullName');
    const token = localStorage.getItem('token');

    if (token && email) {
      setIsLoggedIn(true);
      setFormData(prev => ({ ...prev, email, fullName }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    const { email, password } = formData;
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};

    const usersArray = Object.values(storedUsers);

    const foundUser = usersArray.find(user => user.email === email && user.password === password);

    if (foundUser) {
      const token = generateToken(email);

      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('fullName', foundUser.fullName);

      setIsLoggedIn(true);
      setFormData(prev => ({ ...prev, fullName: foundUser.fullName }));
      setMessage({ success: '', error: '' });
      navigate('/admin');
    } else {
      setMessage({ error: 'Sai email hoặc mật khẩu.', success: '' });
    }
  };

  const handleRegister = () => {
    const { fullName, phone, email, password } = formData;
    if (fullName && phone && email && password) {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (storedUsers[email]) {
      setMessage({ error: 'Email đã tồn tại. Vui lòng sử dụng email khác.', success: '' });
      return;
    }

    storedUsers[email] = { fullName, phone, email, password };
    localStorage.setItem('users', JSON.stringify(storedUsers));

      // KHÔNG tự động đăng nhập
      setMessage({ success: 'Đăng ký thành công. Vui lòng đăng nhập.', error: '' });
      setIsRegistering(false);
      setFormData({ email: '', password: '', fullName: '', phone: '' }); // reset form
    } else {
      setMessage({ error: 'Vui lòng điền đầy đủ thông tin.', success: '' });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setFormData({ email: '', password: '', fullName: '', phone: '' });
    setIsLoggedIn(false);
    navigate('/admin');
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSubmitSearch = () => {
    console.log('Tìm kiếm:', searchTerm);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">🎬 Movie Ticket App</h1>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 font-medium">👤 {formData.fullName || 'User'}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsRegistering(false)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Đăng nhập
              </button>
              <button onClick={() => setIsRegistering(true)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Đăng ký
              </button>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-grow">
        <aside className="basis-3/12 bg-indigo-800 text-white hidden sm:flex flex-col">
          <div className="h-16 flex items-center px-8 text-3xl font-bold">ADMIN</div>
          <nav className="mt-8 space-y-3 px-8">
            <Link to="/admin" className="block hover:text-indigo-200">Dashboard</Link>
            <Link to="/admin/category" className="block hover:text-indigo-200">Category</Link>
            <Link to="/admin/products" className="block hover:text-indigo-200">Products</Link>
          </nav>
        </aside>

        <main className="basis-9/12 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search"
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300"
              />
              <button onClick={handleSubmitSearch} className="absolute right-3 top-2.5 text-xl">🔍</button>
            </div>
          </div>

          {/* Chỉ hiển thị form nếu chưa đăng nhập */}
          {!isLoggedIn && (
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
              {isRegistering ? (
                <div>
                  <h2 className="text-xl font-semibold text-center mb-4">Đăng Ký</h2>
                  <input name="fullName" placeholder="Họ tên" className="input w-full mb-2 p-2 border rounded" onChange={handleInputChange} />
                  <input name="phone" placeholder="Số điện thoại" className="input w-full mb-2 p-2 border rounded" onChange={handleInputChange} />
                  <input name="email" placeholder="Email" className="input w-full mb-2 p-2 border rounded" onChange={handleInputChange} />
                  <input name="password" type="password" placeholder="Mật khẩu" className="input w-full mb-2 p-2 border rounded" onChange={handleInputChange} />
                  <button onClick={handleRegister} className="w-full bg-green-600 text-white py-2 mt-2 rounded hover:bg-green-700">Đăng Ký</button>
                  {message.error && <p className="text-red-600 mt-2 text-sm">{message.error}</p>}
                  {message.success && <p className="text-green-600 mt-2 text-sm">{message.success}</p>}
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-center mb-4">Đăng Nhập</h2>
                  <input name="email" placeholder="Email" className="input w-full mb-2 p-2 border rounded" onChange={handleInputChange} />
                  <input name="password" type="password" placeholder="Mật khẩu" className="input w-full mb-2 p-2 border rounded" onChange={handleInputChange} />
                  <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 mt-2 rounded hover:bg-blue-700">Đăng Nhập</button>
                  {message.error && <p className="text-red-600 mt-2 text-sm">{message.error}</p>}
                </div>
              )}
            </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutBackend;
