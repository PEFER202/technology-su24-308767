import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSelectedCategories } from "../redux/productsSlice";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const categoriesStatus = useSelector(
    (state) => state.products.categoriesStatus
  );

  const selectedCategories = useSelector(
    (state) => state.products.selectedCategories
  );

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStatus]);

  const handleCategoriesChange = (event) => {
    dispatch(setSelectedCategories(event.target.value));
  };

  return (
    <div className="categories-list">
      <h3>Categories</h3>
      {categories.map((category) => (
        <div key={category.id}>
          <input
            type="radio"
            id={category.id}
            name="category"
            value={category.id}
            checked={selectedCategories === category.id.toString()}
            onChange={handleCategoriesChange}
          />
          <label>{category.name}</label>
        </div>
      ))}
    </div>
  );
};
export default CategoriesList;
