import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Category from "../Pages/Category/Category/Category";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import News from "../Pages/News/News/News";
import Profile from "../Pages/Others/Profile/Profile";
import TermsAndConditions from "../Pages/Others/TermsAndConditions/TermsAndConditions";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


export const routes = createBrowserRouter([
    {
        path: '/',
        element:<Layout></Layout>,
        children: [
            {
                path: '/',
                element:<Home></Home>,
                loader: () => fetch('https://news-portal-server-side.vercel.app/news')
            },
            {
                path: '/category/:id',
                element:<Category></Category>,
                loader: ({params}) => fetch(`https://news-portal-server-side.vercel.app/category/${params.id}`)
            },
            {
                path: '/news/:id',
                element:<PrivateRoute><News></News></PrivateRoute>,
                loader: ({params}) => fetch(`https://news-portal-server-side.vercel.app/news/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/terms',
                element: <TermsAndConditions></TermsAndConditions>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            }
        ]
    }
])