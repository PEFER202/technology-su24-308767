import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrands,
  fetchCategories,
  fetchProducts,
} from "../redux/productsSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.products.categories);
  const brands = useSelector((state) => state.products.brands);
  const products = useSelector((state) => state.products.products);
  const selectedBrand = useSelector((state) => state.products.selectedBrand);
  const selectedCategories = useSelector(
    (state) => state.products.selectedCategories
  );

  const categoriesStatus = useSelector(
    (state) => state.products.categoriesStatus
  );
  const brandsStatus = useSelector((state) => state.products.brandsStatus);
  const productsStatus = useSelector((state) => state.products.productsStatus);

  useEffect(() => {
    if (brandsStatus === "idle") dispatch(fetchBrands());
    if (categoriesStatus === "idle") dispatch(fetchCategories());
    if (productsStatus === "idle") dispatch(fetchProducts());
  }, [dispatch, brandsStatus, categoriesStatus, productsStatus]);

  const getBrandById = (id) => {
    const brand = brands.find((brand) => brand.id == id);
    return brand ? brand.name : "Unknown Brand";
  };

  const getCategoryById = (id) => {
    const category = categories.find((category) => category.id == id);
    return category ? category.name : "Unknown Category";
  };

  // const filteredProducts = selectedBrand
  //   ? products.filter((product) => product.brand === parseInt(selectedBrand))
  //   : products;

  // const filteredCategories = selectedCategories
  //   ? products.filter(
  //       (product) => product.category === parseInt(selectedCategories)
  //     )
  //   : products;

  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrand
      ? product.brand === parseInt(selectedBrand)
      : true;
    const matchesCategory = selectedCategories
      ? product.category === parseInt(selectedCategories)
      : true;
    return matchesBrand && matchesCategory;
  });

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div className="card col-md-3" key={product.id}>
          <img
            className="card-img-top"
            src={`/images/${product.image}`}
            alt={product.title}
          />
          <div className="card-body">
            <h4 className="card-title">{product.title}</h4>
            <p className="card-text">
              Brand: <strong>{getBrandById(product.brand)}</strong>
            </p>
            <p className="card-text">
              Category: <strong>{getCategoryById(product.category)}</strong>
            </p>
            <p className="old-price">Price: ${product.price}</p>
            <p className="discount">Discount: {product.discountPercentage}%</p>
            <p className="new-price">
              New Price: $
              {(
                product.price -
                product.price * (product.discountPercentage / 100)
              ).toFixed(0)}
            </p>
            <Link className="nav-link" to={`/product/${product.id}`}>
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
