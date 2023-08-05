import {Outlet, createBrowserRouter} from "react-router-dom"
import Default from "./pages/Default/default"
import Home from "./pages/Home/home"
import Registration from "./pages/Registration/registration"
export const router = createBrowserRouter([
    {
        path:'/' ,
        element:<Default />,
        children:[   
            {
            path:'/',
            element:<Home />
            },
        
        ],
    },
    {
        path:'/register',
        element:<Registration/>,
    },
   
    {
        path:"*",
        element : <div>Not Found</div>
    }
    

])