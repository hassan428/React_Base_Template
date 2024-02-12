import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
        <Route path='' element={<h1> hello World </h1> } />

        </Route>
    )
)


export const Router_app = () => {
  return (
    <RouterProvider router={router} />
  )
}
