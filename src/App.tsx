import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Layout from "./Layout/Layout";
import AuthCheck from "./utils/AuthCheck";
import ProtectedRoute from "./utils/ProtectedRoute";
import Products from "./pages/Products/Products";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthCheck>
          <SignIn />
        </AuthCheck>
      ),
    },
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "products",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        // {
        //   path: "category/:id",
        //   element: <Catalog />,
        // },
        // {
        //   path: "product/:id",
        //   element: <Product />,
        // },
        // {
        //   path: "cart",
        //   element: <Cart />,
        // },
      ],
    },
  ]);

  // const { data = [] } = useGetDataQuery("");

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
