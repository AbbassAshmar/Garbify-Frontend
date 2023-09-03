import {Outlet, createBrowserRouter} from "react-router-dom"
import Default from "./pages/Default/default"
import Home from "./pages/Home/home"
import Registration from "./pages/Registration/registration"
import Login from "./pages/Login/login"
import Products from "./pages/Products/products"
import Product from "./pages/Product/product"
export const router = createBrowserRouter([
    {
        path:'/' ,
        element:<Default />,
        children:[   
            {
            path:'/',
            element:<Home />
            },
            {path:'/products/*',
            element:<Products />
            },
            {
                path:'/product/:name/:id',
                element:<Product />
            },
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
    }
    

])