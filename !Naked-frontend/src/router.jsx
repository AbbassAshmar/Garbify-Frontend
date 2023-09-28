import {Outlet, createBrowserRouter} from "react-router-dom"
import Default from "./pages/Default/default"
import Home from "./pages/Home/home"
import Registration from "./pages/Registration/registration"
import Login from "./pages/Login/login"
import Products from "./pages/Products/products"
import Product from "./pages/Product/product"
import Cart from "./pages/Cart/cart"
import Orders from './pages/Orders/orders'
import Review from "./pages/Review/review"
export const router = createBrowserRouter([
    {
        path:'/' ,
        element:<Default />,
        children:[   
            {
                path:'/',
                element:<Home />
            },
            {
                path:'/products/*',
                element:<Products />
            },
            {
                path:'/product/:name/:id',
                element:<Product />
            },
            {
                path:'/orders',
                element:<Orders />
            },
            {
                path:'/cart',
                element:<Cart />
            },
            {
                path:"/review/:product_id",
                element:<Review />
            }
        ],
    },
    {
        path:'/register',
        element:<Registration/>,
    },
    {
        path:'/login',
        element:<Login />

    },
    
    {
        path:"*",
        element : <div>Not Found</div>
    },
    
    

])