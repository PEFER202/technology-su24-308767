import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, setSelectedBrand } from "../redux/productsSlice";

const BrandsList = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.products.brands);
  const brandsStatus = useSelector((state) => state.products.brandsStatus);
  const selectedBrand = useSelector((state) => state.products.selectedBrand);

  useEffect(() => {
    if (brandsStatus === "idle") {
      dispatch(fetchBrands());
    }
  }, [dispatch, brandsStatus]);

  const handleBrandChange = (event) => {
    dispatch(setSelectedBrand(event.target.value));
  };

  return (
    <div className="brands-list">
      <h3>Brands</h3>
      {brands.map((brand) => (
        <div key={brand.id}>
          <input
            type="radio"
            id={brand.id}
            name="brand"
            value={brand.id}
            checked={selectedBrand === brand.id.toString()}
            onChange={handleBrandChange}
          />
          <label>{brand.name}</label>
        </div>
      ))}
    </div>
  );
};

export default BrandsList;
