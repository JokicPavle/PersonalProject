import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} from "../state/cartProducts";
import "../styles/cart.css";
import closeImg from "../icons/close.svg";
import { Link } from "react-router-dom";
export const Cart = ({ cartOpened, setCartOpened }) => {
  const cartProducts = useSelector((state) => state.cartProducts);
  const dispatch = useDispatch();
  const totalPrice = cartProducts.reduce((prevValue, item) => {
    const itemPrice = item.priceOnSale || item.price;
    return prevValue + item.quantity * itemPrice;
  }, 0);

  return (
    <div className={`cart-container  ${cartOpened ? "slideIn" : "slideOut"}`}>
      <img
        onClick={() => setCartOpened(!cartOpened)}
        className="closeImg"
        src={closeImg}
        alt="Cart Img"
      />
      <div className="cart-header">
        <h1 className="text-white mb-5 mt-3 mx-3">Cart</h1>
      </div>
      {cartProducts.length === 0 ? (
        <p className="text-white text-center">Your cart is empty.</p>
      ) : (
        cartProducts.map((product) => {
          return (
            <div
              className="product mx-2 my-3 d-flex justify-content-between align-items-center"
              key={product.id}
            >
              <div className="d-flex align-items-center w-50">
                <img
                  className="cartProductImg"
                  src={product.img}
                  alt="productImg"
                />
                <h3 className="text-white mx-2">{product.name}</h3>
              </div>

              <div className="d-flex w-50 align-items-center justify-content-around">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div>
                    <button
                      className="btn-danger btn px-2 py-1"
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                    >
                      -
                    </button>
                    <span className="text-white mx-2">{product.quantity}</span>
                    <button
                      className="btn btn-success px-2 py-1"
                      onClick={() => dispatch(increaseQuantity(product.id))}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="mt-3 btn btn-warning"
                    onClick={() => dispatch(removeProduct(product.id))}
                  >
                    Remove
                  </button>
                </div>
                <div>
                  {product.onSale ? (
                    <p className="text-white">
                      {product.priceOnSale}{" "}
                      <i className="bi bi-currency-dollar"></i>
                    </p>
                  ) : (
                    <p className="text-white">
                      {product.price} <i className="bi bi-currency-dollar"></i>
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
      {cartProducts.length > 0 && (
        <div className="d-flex justify-content-around align-items-center mt-5">
          <h4 className="text-white mt-3 ms-3">
            Total Price:{" "}
            <span className="text-xl-start fw-bolder">
              {totalPrice.toFixed(2)} <i className="bi bi-currency-dollar"></i>
            </span>
          </h4>
          <Link to="/checkout">
            <button
              onClick={() => setCartOpened(false)}
              className="btn btn-primary checkout-btn"
            >
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
