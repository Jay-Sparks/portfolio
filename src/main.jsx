import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import { App } from './App.jsx'
import About from '../views/About/About.jsx';
import Cv from '../views/Cv/Cv.jsx';
import ErrorPage from '../views/ErrorPage/ErrorPage.jsx';

import './index.css'
import Experiments from '../views/Experiments/Experiments.jsx';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />
    },
    {
      path: "about",
      element: <About />
    },
    {
      path: "experiments",
      element: <Experiments />
    },
    {
      path: "cv",
      element: <Cv />
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
