import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Admin from './Admin/Admin';
import ProductList from './scenes/ProductList/ProductList';
import ProductDetail from './scenes/ProductDetail/ProductDetail';
import Home from './scenes/Home/Home';
import Checkout from './scenes/checkOut/Checkout';
import ComfirMation from './scenes/checkOut/ComfirMation';
import CartMenu from './scenes/global/CartMenu';
import DashBoard from './Admin/scenes/DashBoard';
import AdminProduct from './Admin/scenes/product/AdminProduct';
import AdminProductBox from './Admin/scenes/product/AdminProductBox';
import AdminProductDetail from './Admin/scenes/product/AdminProductDetail';
import AdminProductAdd from './Admin/scenes/product/AdminProductAdd';
import AdminProductEdit from './Admin/scenes/product/AdminProductEdit';
import Register from './auth/Register';
import Login from './auth/Login';
import { Provider, useSelector } from 'react-redux';
import Store from './state/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    //con của app
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />

      },
      {
        path: 'login',
        element: <Login />

      },
      {
        path: 'product',
        element: <ProductList />
      },
      {
        path: 'product/page/:pageNum',
        element: <ProductList />
      },
      {
        path: 'product/:id',
        element: <ProductDetail />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'checkout/success',
        element: <ComfirMation />
      },
      {
        path: 'cart',
        element: <CartMenu />
      }
    ]
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        index: true,
        element: <DashBoard />
      },
      {
        path: '/admin/product',
        element: <AdminProduct />,
        children: [
          {
            index: true,
            element: <AdminProductBox />
          },
          {
            path: '/admin/product/page/:pageNum',
            element: <AdminProductBox />
          },
          {
            path: '/admin/product/:id',
            element: <AdminProductDetail />,
          },
          {
            path: '/admin/product/add',
            element: <AdminProductAdd />,
          },
          {
            path: '/admin/product/edit/:id',
            element: <AdminProductEdit />,
          },
        ]

      }
    ]
  },



])

root.render(
  <Provider store={Store}>
    <RouterProvider router={router}>

    </RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
