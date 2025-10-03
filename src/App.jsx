import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AddProduct from './components/AddProduct';
import AdminNavbar from './components/AdminNavbar';
import Ads from './components/Ads';
import AllOrders from './components/AllOrders';
import Carosuel from './components/Carosuel';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import DeleteProduct from './components/DeleteProduct';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Nav2 from './components/Nav2';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import ProductDetails from './components/ProductDetails';
import ProductSlide from './components/ProductSlide';
import Register from './components/Register';
import UpdateProduct from './components/UpdateProduct';
function Layout() {
  const location = useLocation();
  const hideNavFooter = location.pathname === "/login" || location.pathname === "/new-register";
  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<>

          <Nav2 />
          <Carosuel />
          <Home />
          <Ads />
          <ProductSlide />

        </>}
        />
        <Route path="/new-register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin' element={<AdminNavbar />} />
        <Route path='/add' element={
          <>
            <AdminNavbar />
            <AddProduct />
          </>
        } />

        <Route path='/delete' element={
          <>
            <AdminNavbar />
            <DeleteProduct />
          </>
        } />

        <Route path='/update' element={
          <>
            <AdminNavbar />
            <UpdateProduct />
          </>
        } />

        <Route path='/allorders' element={
          <>
            <AdminNavbar />
            <AllOrders />
          </>
        } />

        {/* product by id  */}
        <Route path='/id/:id' element={<ProductDetails apiEndpoint="/api/product/id" paramName="id" />} />
        <Route path='/name/:pname' element={<ProductDetails apiEndpoint="/api/product/name" paramName="pname" />} />
        <Route path='/price/:price' element={<ProductDetails apiEndpoint="/api/product/price" paramName="price" />} />
        <Route path='/category/:category' element={<ProductDetails apiEndpoint="/api/product/category" paramName="category" />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      {!hideNavFooter && <Footer />}

    </>
  )
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <Layout/>
        </CartProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
