import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header className="header">
        <nav>
          <Link to={`/products`}>Products</Link>
          {/* <Link></Link>
          <Link></Link>
          <Link></Link>
          <Link></Link> */}
        </nav>
      </header>
      <Outlet/>
      <section className="section"></section>
    </div>
  );
};

export default Layout;
