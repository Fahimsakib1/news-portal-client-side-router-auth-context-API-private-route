import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Category from "../Pages/Category/Category/Category";
import Home from "../Pages/Home/Home/Home";
import News from "../Pages/News/News/News";

export const routes = createBrowserRouter([
    {
        path: '/',
        element:<Layout></Layout>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/category/:id',
                element:<Category></Category>
            },
            {
                path: '/news/:id',
                element:<News></News>
            }
        ]
    }
])