import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

//import de google fonts
<link href="https://fonts.googleapis.com/css2?family=Asap+Condensed:wght@300;400;600&display=swap" rel="stylesheet"></link>

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <h1>Error</h1>
  },
  {
    path: "/login",
    element: <p>login</p>
  },
  {
    path: "/contact",
    element: <h1>Contact</h1>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);



