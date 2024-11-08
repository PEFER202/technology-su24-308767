import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch products data");
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:5000/product/${productId}`
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      return productId;
    } catch (error) {
      throw Error("Failed to delete video");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/category");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch categories data");
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/brand");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch brands data");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories: [],
    brands: [],
    product: {},
    selectedBrand: "",
    selectedCategories: "",
    productsStatus: "idle",
    productStatus: "idle",
    categoriesStatus: "idle",
    brandsStatus: "idle",
    error: null,
  },
  reducers: {
    setSelectedBrand(state, action) {
      state.selectedBrand = action.payload;
    },
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.productStatus = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.productStatus = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.productStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsStatus = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export const { setSelectedBrand, setSelectedCategories } = productSlice.actions;

export default productSlice.reducer;
