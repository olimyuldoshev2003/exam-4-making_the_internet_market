import React from "react";
import { useDeleteProductMutation, useGetDataQuery } from "../../api/products";

const Products = () => {
  const { data = [] } = useGetDataQuery("");
  const [deleteUser] = useDeleteProductMutation() 
  console.log(data);

  

  return (
    <div>
      <section className="section_1"></section>
      <section className="section_2">
        <div>
          <h1 className=" text-[23px] font-[500] text-[blue]">Categories</h1>
        </div>
        <div className="mapped_block mt-[30px] flex flex-wrap justify-start gap-[10px]">
          {data.map((item:any) => {
            return (
              <div key={item.id}>
                <div className="w-[240px] h-[280px] shadow-2xl">
                  {item.media.map((item2:any) => {
                    return (
                      <div>
                        <img src={item2.src} alt="" />
                      </div>
                    );
                  })}
                  <h1 className="p-[20px] text-[#000]  text-[21px]">
                    {item.name}
                  </h1>
                  <button onClick={() => deleteUser(item.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section_3"></section>
      <section className="section_4"></section>
      <section className="section_5"></section>
    </div>
  );
};

export default Products;
