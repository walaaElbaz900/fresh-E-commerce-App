import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CategoriesPage from './Pages/CategoriesPage';
import CartPage from './Pages/CartPage';
import Home from './Pages/Home';
import BrandsPage from './Pages/BrandsPage';
import ProductsPage from './Pages/ProductsPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ResetPassword from './Pages/ResetPassword';
import ProductPage from './Pages/ProductPage'; // Import the ProductPage component

import WishlistPage from './Pages/WishlistPage';
import PrivateRoute from './PrivateRoute';
// import { UserContextProvider } from './contexts/userContext';

import './App.css';

function App() {
  return (
    // <UserContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute element={Home} />} />
        <Route path="/categories"  element={<PrivateRoute element= {CategoriesPage} />} />
        <Route path="/wishlist"  element={<PrivateRoute  element={WishlistPage} />} />
        <Route path="cart" element={<PrivateRoute element={CartPage} />} />
        <Route path="brands"  element={<PrivateRoute element={BrandsPage} />} />
        <Route path="products"  element={<PrivateRoute element={ProductsPage} />} />
        <Route path="login"  element={<LoginPage/>} />
        <Route path="signup"  element={<PrivateRoute element={SignupPage} />} />
        <Route path="reset"  element={<PrivateRoute element={ResetPassword} />} />
        <Route path="/products/:productId"  element={<PrivateRoute element={ProductPage} />} />

      </Routes>
    </Router>
    // </UserContextProvider>
  );
}

export default App;
