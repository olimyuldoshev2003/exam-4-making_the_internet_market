import React from "react";
import { useGetDataQuery } from "../../api/products";

const Products = () => {
  const { data = [] } = useGetDataQuery("");

  return (
    <div>
      <section className="section_1"></section>
      <section className="section_2">
        {data.map((item) => {
          return (
            <div key={item.id}>
              <div className="text-[red]">
                <h1>{item.name}</h1>
              </div>
            </div>
          );
        })}
      </section>
      <section className="section_3"></section>
      <section className="section_4"></section>
      <section className="section_5"></section>
    </div>
  );
};

export default Products;
