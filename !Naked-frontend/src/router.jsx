import {createBrowserRouter} from "react-router-dom"
import Default from "./pages/Default/default"
import Home from "./pages/Home/home"
import Registration from "./pages/Registration/registration"
import Login from "./pages/Login/login"
import Products from "./pages/Products/products"
import Product from "./pages/Product/product"
import Orders from './pages/Orders/orders'
import ReviewPurchasedProduct from "./pages/ReviewPurchasedProduct/review-purchased-product"
import Favorites from "./pages/Favorites/favorites"
import OtherUsersFavorites from "./pages/OtherUsersFavorites/other-users-favorites"
import User from "./pages/User/user"
import Reviews from "./pages/Reviews/reviews"
import OtherUsersFavoritesLists from "./pages/OtherUsersFavoritesLists/other-users-favorites-lists"
import ReviewPurchasedProductEdit from "./pages/ReviewPurchasedProduct/review-purchased-product-edit"

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
                path:"/review/:product_id",
                element:<ReviewPurchasedProduct />
            },
            {
                path:"/review/:product_id/edit",
                element:<ReviewPurchasedProductEdit />
            },
            {
                path:'/favorites',
                element:<Favorites />
            },
            {
                path:'/favorites-lists',
                element:<OtherUsersFavoritesLists />
            },
            {
                path:"/favorites-lists/:favorites_list_id",
                element:<OtherUsersFavorites />
            },
            {
                path:"/user",
                element:<User />
            },
            {
                path:"/reviews",
                element:<Reviews />
            },
            {
                path:"*",
                element : <div>Not Found</div>
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
    
    

])