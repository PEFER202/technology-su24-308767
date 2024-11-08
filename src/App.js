import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProductPage from "./components/productPage";
import ProductDetails from "./components/productDetails";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
