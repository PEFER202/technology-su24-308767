import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProduct } from "../redux/productsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.products.product);
  const productStatus = useSelector((state) => state.products.productStatus);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Do you want to delete this product?");
    if (confirmDelete) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          alert("Product deleted successfully!");
          navigate("/");
        })
        .catch((error) => {
          alert("Failed to delete product: " + error.message);
        });
    }
  };

  useEffect(() => {
    if (productStatus === "idle" || product?.id != parseInt(productId)) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId, productStatus, product]);

  if (productStatus === "loading") {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found or does not exist.</p>;
  }

  return (
    <>
      <div className="product-img col-md-4">
        <img
          style={{ width: "100%" }}
          src={`/images/${product.image}`}
          alt={product.title}
        />
      </div>
      <div className="product-info">
        <h1>Product details: {product.title}</h1>
        <p>
          <strong>ID: </strong>
          {product.id}
        </p>
        <p>
          <strong>Description: </strong>
          {product.description}
        </p>
        <p className="old-price">Price: ${product.price}</p>
        <p className="discount">Discount: {product.discountPercentage}%</p>
        <p className="new-price">
          New Price: $
          {(
            product.price -
            product.price * (product.discountPercentage / 100)
          ).toFixed(2)}
        </p>
        <p>
          <strong>Rating: </strong>
          {product.rating}
        </p>
        <p>
          <strong>Stock: </strong>
          {product.stock}
        </p>
        <div className="product-action-btn">
          <Link className="btn btn-success" to="/">
            Back to List
          </Link>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => handleDelete(product.id)}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
