import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";
import logoImg from "../assets/logo.png";
import listIcon from "../icons/list.svg";
import closeIcon from "../icons/close.svg";
import cartIcon from "../icons/cart.svg";
import cartClose from "../icons/cartClose.svg";
import { Cart } from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { stopShaking } from "../state/addToCartAnimation";
export const Header = () => {
  const [navbarOpened, setNavbarOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const isShaking = useSelector((state) => state.addToCart.isShaking);
  const cartProducts = useSelector((state) => state.cartProducts);
  const dispatch = useDispatch();
  let location = useLocation();

  const totalQuantity = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );
  useEffect(() => {
    if (isShaking) {
      setTimeout(() => {
        dispatch(stopShaking());
      }, 500); // Shaking duration
    }
  }, [isShaking, dispatch]);

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row d-flex justify-content-between">
            <div className="col d-flex justify-content-end justify-content-sm-start">
              <Link className="link" to="/">
                <img className="logo" src={logoImg} alt="Logo" />
              </Link>
            </div>
            <div className="col d-sm-flex justify-content-center justify-content-lg-end align-items-center me-3">
              {/* <div className="navbar d-sm-none d-inline-block"> */}
              {/* {navbarOpened ? (
                  <img className="listImg" src={closeIcon} />
                ) : (
                  <img className="listImg" src={listIcon} />
                )} */}
              {/* </div> */}
              <div
                onClick={() => setNavbarOpened(!navbarOpened)}
                className="container d-sm-none d-inline-block"
              >
                <div
                  className={`button_container ${
                    navbarOpened ? "active position-fixed" : "position-absolute"
                  }`}
                >
                  <span className="top"></span>
                  <span className="middle"></span>
                  <span className="bottom"></span>
                </div>
              </div>
              {/* {navbarOpened && ( */}
              <div className={`overlay ${navbarOpened ? "open" : ""}`}>
                <nav className="mobileMenu">
                  <ul className="mobileList list">
                    <li>
                      <Link
                        className={`link ${
                          location.pathname === "/" && "active"
                        }`}
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`link ${
                          location.pathname === "/about" && "active"
                        }`}
                        to="/about"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`link ${
                          location.pathname === "/contact" && "active"
                        }`}
                        to="/contact"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`link ${
                          location.pathname === "/products" && "active"
                        }`}
                        to="/products"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`link ${
                          location.pathname === "/login" && "active"
                        }`}
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* )} */}
              <div className="d-flex align-items-center position-relative">
                <ul className="list d-none d-sm-flex align-items-center gap-2 mt-3">
                  <Link
                    className={`link ${location.pathname === "/" && "active"}`}
                    to="/"
                  >
                    Home
                  </Link>

                  <Link
                    className={`link ${
                      location.pathname === "/about" && "active"
                    }`}
                    to="/about"
                  >
                    About
                  </Link>

                  <Link
                    className={`link ${
                      location.pathname === "/contact" && "active"
                    }`}
                    to="/contact"
                  >
                    Contact
                  </Link>
                  <Link
                    className={`link ${
                      location.pathname === "/products" && "active"
                    }`}
                    to="/products"
                  >
                    Products
                  </Link>
                  <Link
                    className={`link ${
                      location.pathname === "/login" && "active"
                    }`}
                    to="/login"
                  >
                    Login
                  </Link>
                </ul>
                <div className="position-relative mx-sm-4">
                  <div
                    data-totalitems={totalQuantity}
                    className={`cart-btns cart position-absolute ${
                      isShaking ? "shake" : ""
                    }`}
                  >
                    <img
                      onClick={() => setCartOpened(!cartOpened)}
                      className="cartImg"
                      src={cartIcon}
                      alt="Cart Img"
                    />

                    {/* <span className="text-white position-absolute border rounded-circle px-2 top-50">
                      {totalQuantity}
                    </span> */}
                  </div>
                  {cartOpened && (
                    <Cart
                      cartOpened={cartOpened}
                      setCartOpened={setCartOpened}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="divider"></div>
    </>
  );
};
