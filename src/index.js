import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Contact from "./routes/Contact";
import Index from "./routes/Index";
import Root from "./routes/Root";
import Post from "./routes/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          return fetch(
            "https://jsonplaceholder.typicode.com/posts?_expand=user"
          ).then((response) => {
            return response.json();
          });
        },
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/posts/:postId", // :postId is a dynamic segment
        element: <Post />,
        loader(loaderData) {
          return fetch(
            `https://jsonplaceholder.typicode.com/posts/${loaderData.params.postId}?_expand=user&_embed=comments`
          ).then((response) => {
            return response.json();
          });
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
