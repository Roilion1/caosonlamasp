
import HomePage from '../pages/frontend/Home/HomePage.js';
import Register from '../pages/frontend/Auth/Register.js';
import Login from '../pages/frontend/Auth/Login';
import ProductList from '../pages/frontend/Product/Product';
import Cart from '../pages/frontend/ShoppingCart/Cart.js';
import Checkout from '../pages/frontend/ShoppingCart/Checkout.js';
import CategoryList from '../pages/frontend/Category/Category.js';
import CategoryProductPage from '../pages/frontend/Category/CategoryProductPage.js';
import OrderDetail from '../pages/frontend/OrderDetail/OrderDetail.js';

const RouterFrontend = [
  { path: "/", element: <HomePage /> }, 
  { path: "/Register", element: <Register /> },
  { path: "/Login", element: <Login /> },
  { path: "/products", element: <ProductList /> },
  { path: "/Cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/category", element: <CategoryList /> },
  { path: "/category/:id", element: <CategoryProductPage /> },
  { path: "/orderdetail/:productId", element: <OrderDetail /> },
];

export default RouterFrontend;
