import React from "react";
import { useDeleteProductMutation, useGetDataQuery } from "../../api/products";
import { useFormik } from "formik";
import * as yup from "yup";

const Products = () => {
  const { data = [] } = useGetDataQuery("");
console.log(data);


  // // const [deleteUser] = useDeleteProductMutation()
  // console.log(data);

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     categoryId: "",
  //     subCategoryId: "",
  //     brandId: "",
  //     price: "",
  //     discount: "",
  //     hasDiscount: false,
  //     isNew: false,
  //   },
  //   validationSchema: yup.object({
  //     name: yup
  //       .string("Enter category name")
  //       .min(3, "Name should be of minimum 3 characters length")
  //       .required("Name is required"),
  //   }),
  //   onSubmit: async (values) => {
  //     let product = { ...values };
  //     if (img.length === 0) return alert("Please select img");
  //     product.description = value;
  //     product.properties = properties;
  //     let formData = new FormData();

  //     for (let f of img) {
  //       formData.append("files", f);
  //     }
  //     const data = await multiFiles(formData);
  //     let arr = [];
  //     for (let img of data.img) {
  //       let obj = {
  //         type: img.mimetype,
  //         src: img.path,
  //       };
  //       arr.push(obj);
  //     }

  //     product.media = arr;
  //     add(product);
  //     setAddModal(false);
  //   },
  // });

  return (
    <div>
      <section className="section_1"></section>
      <section className="section_2">
        <div>
          <h1 className=" text-[23px] font-[500] text-[blue]">Categories</h1>
        </div>
        <div className="mapped_block mt-[30px] flex flex-wrap justify-start gap-[10px]">
          {data.map((item: any) => {
            return (
              <div key={item.id}>
                <div className="w-[240px] h-[280px] shadow-2xl">
                  <img
                    src={import.meta.env.VITE_APP_FILES_URL + item.media.map((item: { src: any; }) => {
                      return item.src
                    })}
                    alt=""
                    className="h-[160px]"

                  />
                  <h1 className="p-[20px] text-[#936a6a]  text-[21px]">
                    {item.name}
                  </h1>
                  {/* <button onClick={() => deleteUser(item.id)}>Delete</button> */}
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
