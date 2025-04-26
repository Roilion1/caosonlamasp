import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Header() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 10000);
      fetchCartItems(); 
    }
  }, []);

  const fetchCartItems = () => {
    // Lấy thông tin giỏ hàng của người dùng từ API (ví dụ)
    const orderId = 123; // Lấy từ context hoặc URL
    axios.get(`/api/orders/${orderId}`)
      .then(response => {
        if (response.data.status) {
          const items = response.data.items || [];
          setCartCount(items.reduce((acc, item) => acc + item.quantity, 0)); // Tính tổng số lượng sản phẩm trong giỏ hàng
        }
      })
      .catch(error => console.error('Error fetching cart data:', error));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCartCount(0); 
    navigate('/');
  };

  const filterProductsByName = (name) => {
    const params = {
      name: name,
      pageNumber: 0,
      pageSize: 20,
    };

    GET_ALL('products', params)
      .then(response => {
        setFilteredProducts(response.content);
        console.log("Sản phẩm đã lọc", response.content);
      })
      .catch(error => {
        console.error('Không thể lấy dữ liệu sản phẩm đã lọc:', error);
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      filterProductsByName(searchQuery);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const redirectToLogin = () => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  };

  return (
    <div>
      <header className="border-b bg-white shadow-md">
        <section className="py-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="w-1/5">
                <Link to="/" className="block">
                  <img src={require("../../images/logo.png")} alt="Logo" className="w-32 h-auto" />
                </Link>
              </div>

              <div className="w-2/5">
                <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-gray-100 rounded-lg">
                  {/* <select className="border-r border-gray-300 p-2 bg-white text-gray-700 rounded-l-lg">
                    <option value="">Tất cả loại</option>
                    <option value="special">Đặc biệt</option>
                    <option value="best">Chỉ có tốt nhất</option>
                    <option value="latest">Mới nhất</option>
                  </select> */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="w-full p-3 focus:outline-none placeholder-gray-400"
                    placeholder="Tìm kiếm sản phẩm..."
                  />
                  <button type="submit" className="flex items-center px-5 bg-orange-500 text-white h-full">
                    <i className="fa fa-search mr-2"></i>Search
                  </button>
                </form>
              </div>

              <div className="flex items-center space-x-6">
                <Link to="/ProfileMain" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                    <i className="fa fa-user"></i>
                    <span className="text-sm">Tài khoản của tôi</span>
                </Link>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600">
                        Đăng Xuất
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-blue-600">
                            Đăng Nhập
                        </Link>
                        <Link to="/register" className="text-gray-700 hover:text-blue-600">
                            Đăng Ký
                        </Link>
                    </>
                )}
                {/* Giỏ hàng */}
                <Link 
                    to={isLoggedIn ? "/Cart" : "#"} 
                    onClick={!isLoggedIn ? redirectToLogin : null} 
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                >
                    <i className="fa fa-shopping-cart"></i>
                    <span className="text-sm">
                        Giỏ hàng {cartCount > 0 && `(${cartCount})`} {/* Hiển thị số lượng nếu có sản phẩm */}
                    </span>
                </Link>
            </div>
            </div>
          </div>
        </section>
      </header>

      <nav className="bg-blue-500">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-2">
            <button className="text-white block lg:hidden">
              <i className="fa fa-bars"></i>
            </button>

            <div className="hidden lg:flex space-x-6">
              <a href="/category" className="text-white hover:text-gray-200">Trang chủ</a>
              <div className="relative">
                <button 
                  className="text-white hover:text-gray-200" 
                  onClick={toggleDropdown}
                  disabled={!isLoggedIn} 
                >
                  Danh sách sản phẩm
                </button>
                {dropdownOpen && isLoggedIn && (
                  <div className="absolute bg-white text-gray-800 mt-2 rounded-lg shadow-lg">
                    <Link to="/products" className="block p-2 hover:bg-gray-100">Tất cả sản phẩm</Link>
                  </div>
                )}
              </div>
              <a href="/NewsPage" className="text-white hover:text-gray-200">Tin tức</a>
              <a href="st#" className="text-white hover:text-gray-200">Giới thiệu</a>
            </div>

            <div className="hidden lg:flex space-x-6">
              <a href="st#" className="text-white hover:text-gray-200">Tải ứng dụng</a>
              <div className="relative">
                <button className="text-white hover:text-gray-200">English</button>
                <div className="absolute hidden group-hover:block bg-white text-gray-800 mt-2 rounded-lg shadow-lg">
                  <a href="st#" className="block p-2 hover:bg-gray-100">Russian</a>
                  <a href="st#" className="block p-2 hover:bg-gray-100">French</a>
                  <a href="st#" className="block p-2 hover:bg-gray-100">Spanish</a>
                  <a href="st#" className="block p-2 hover:bg-gray-100">Chinese</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hiển thị sản phẩm tìm được */}
      {filteredProducts.length > 0 && (
        <div className="container mx-auto mt-4">
          <h2 className="text-lg font-semibold">Sản phẩm tìm được</h2>
          <div className="grid grid-cols-3 gap-6 mt-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="border p-4">
                <img src={product.imageUrl} alt={product.name} className="w-full h-auto" />
                <h3>{product.name}</h3>
                <p>{product.price ? product.price.toLocaleString() : 'Chưa có giá'}</p>
                <button className="mt-2 bg-orange-500 text-white py-2 px-4">Thêm vào giỏ</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
