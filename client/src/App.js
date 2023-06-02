import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Products from "./Pages/Products/Products";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./app.scss"

const Layout = () => {
  return <div className="app">
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
    
}

const router = createBrowserRouter([
  {
    path: '/',
    element : <Layout/>,
    children :[
      {
        path: '/',
        element : <Home/>
      },
      {
      path: '/products/:id',
      element : <Products/>
      },
      {
        path: '/product/:id',
        element : <Product/>
      }
    ]
  }
  ])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
