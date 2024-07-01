import {createBrowserRouter} from "react-router-dom"
import Default from "./pages/Default/default"
import Home from "./pages/Home/home"
import Registration from "./pages/Registration/registration"
import Login from "./pages/Login/login"
import Products from "./pages/Products/products"
import Product from "./pages/Product/product"
import Orders from './pages/Orders/orders'
import Favorites from "./pages/Favorites/favorites"
import OtherUsersFavorites from "./pages/OtherUsersFavorites/other-users-favorites"
import User from "./pages/User/user"
import Reviews from "./pages/Reviews/reviews"
import OtherUsersFavoritesLists from "./pages/OtherUsersFavoritesLists/other-users-favorites-lists"
import CreateReview from "./pages/CreateReview/create-review"
import EditReview from "./pages/EditReview/edit-review";
import Error from "./pages/Error/error";

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
                path:"/products/:product_id/review",
                element:<CreateReview />
            },
            {
                path:"/reviews/:review_id/edit",
                element:<EditReview />
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
                element :<Error error={{statusCode:404, message:"You could've picked any page, but still chose this ? It Doesn't Exist..."}} />
            },
            {
                path:"/reviews/success"
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

])