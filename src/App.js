
import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import Navbar from './component/Home/Navbar';
import Footer from './component/Layout/Footer';
import Login from './component/User/Login';
import Register from './component/User/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Profile from './component/User/Profile';
import Products from './component/products/Products';
import ProtectedRoute from './component/route/ProtectedRoute';
import { useSelector } from 'react-redux';
import store from './store';
import { clearErrors, loadUser } from './component/Action/userAction';
import ProductsDetails from './component/products/ProductsDetails';
import About from './component/About/About';
import Contact from './component/Contact/Contact';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Dashboard from './component/Admin/Dashboard';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './component/Cart/Payment';
import { loadStripe } from '@stripe/stripe-js';
import Success from './component/Cart/Success';
import MyOrder from './component/Order/MyOrder';
import Posts from './component/Post/Posts';
import PostDetails from './component/Post/PostDetails';
import ProductsList from './component/Admin/ProductsList';
import OrderDetails from './component/Order/OrderDetails';
import NewProduct from './component/Admin/NewProduct';
import OrderList from './component/Admin/OrderList';
import UpdateOrder from './component/Admin/UpdateOrder';
import UserList from './component/Admin/UserList';
import UpdateUser from './component/Admin/UpdateUser';
import Accessories from './component/products/Accessories';
import SellerDashboard from './component/SellerDashboard/SellerDashboard';
import SellerAddNewPost from './component/SellerDashboard/SellerAddNewPost';
import SellerProductList from './component/SellerDashboard/SellerProductList';
import UpdateProduct from './component/Admin/UpdateProduct';
import BlogList from './component/Admin/BlogList';
import UpdateBlog from './component/Admin/UpdateBlog';
import NewBlogPost from './component/Admin/NewBlogPost';
import UpdateProdile from './component/User/UpdateProdile';
import UpdatePassword from './component/User/UpdatePassword';
import 'aos/dist/aos.css';

function App() {
  axios.defaults.withCredentials = true;
  // import logged user 
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("http://localhost:5000/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
    // console.log(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();

  }, []);
  
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Fragment>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/home' element={<Home />} ></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/accessories' element={<Accessories />}></Route>
        <Route path='/products/:id' element={<ProductsDetails />}></Route>
        <Route path='/blogs' element={<Posts />}></Route>
        <Route path='/blogs/:id' element={<PostDetails />}></Route>

        {/* admin route  */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >

              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <ProductsList />
            </ProtectedRoute>
          }
        ></Route>
        {/* create product  */}
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <NewProduct />
            </ProtectedRoute>
          }
        ></Route>

        {/* update product  */}
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <UpdateProduct />
            </ProtectedRoute>
          }
        ></Route>

        {/* order list  */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <OrderList />
            </ProtectedRoute>
          }
        ></Route>
        {/* update oder  */}
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <UpdateOrder />
            </ProtectedRoute>
          }
        ></Route>

        {/* user list  */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <UserList />
            </ProtectedRoute>
          }
        ></Route>

        {/* update user  */}

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <UpdateUser />
            </ProtectedRoute>
          }
        ></Route>

        {/* blog list  */}
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <BlogList />
            </ProtectedRoute>
          }
        ></Route>

        {/* create blog  */}

        <Route
          path="/admin/blog/new"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <NewBlogPost />
            </ProtectedRoute>
          }
        ></Route>
        {/* update blog  */}
        <Route
          path="/admin/post/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === "admin" ? true : false}
            >
              <UpdateBlog />
            </ProtectedRoute>
          }
        ></Route>

        {/* protected route --user */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>

          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/shipping' element={<Shipping />}></Route>
          <Route path='/order/confirm' element={<ConfirmOrder />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/update/me' element={<UpdateProdile />}></Route>
          <Route path='/update/password' element={<UpdatePassword />}></Route>
          <Route path='/orders' element={<MyOrder />}></Route>
          <Route path='/order/:id' element={<OrderDetails />}></Route>
          <Route>
            {stripeApiKey && (
              <Route
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)} >
                    <Payment stripeApiKey={stripeApiKey} />
                  </Elements>
                }
              >

              </Route>
            )}
          </Route>
          <Route path='/success' element={<Success />}></Route>
          <Route path='/seller/dashboard' element={<SellerDashboard />}></Route>
          <Route path='/seller/product/new' element={<SellerAddNewPost />}></Route>
          <Route path='/seller/product' element={<SellerProductList />}></Route>

        </Route>

        {/* admin route  */}


      </Routes>

      <Footer />
    </Fragment >
  );
}

export default App;
