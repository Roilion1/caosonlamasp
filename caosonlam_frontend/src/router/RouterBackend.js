// src/router/RouterBackend.js
import Dashboard from '../pages/admin/Dashboard'; 
import Category from '../pages/admin/Category';
import Product from '../pages/admin/Product';

const RouterBackend = [
  { path: "/admin", element: <Dashboard /> }, 
  { path: "/admin/category", element: <Category />},
  { path: "/admin/products", element: <Product />},
];

export default RouterBackend;