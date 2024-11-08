import React from "react";
import BrandsList from "./brandList";
import CategoriesList from "./categoriesList";
import ProductList from "./productList";

const ProductPage = () => {
  return (
    <>
      <div className="list-choice col-md-2">
        <CategoriesList />
        <BrandsList />
      </div>
      <div style={{ width: "100%" }}>
        <h1 style={{ textAlign: "center" }}>List of Products</h1>
        <ProductList />
      </div>
    </>
  );
};

export default ProductPage;
