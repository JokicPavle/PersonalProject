import React, { useEffect, useState } from "react";
import "../styles/product.css";
import { Search } from "./Search";
import { Pagination } from "./Pagination";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  increaseQuantity,
  decreaseQuantity,
} from "../state/cartProducts";
import {
  startSending,
  stopSending,
  startShaking,
  stopShaking,
} from "../state/addToCartAnimation";
export const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const cartProduct = useSelector((state) => state.cartProducts);
  const isSending = useSelector((state) => state.addToCart.isSending);
  const isShaking = useSelector((state) => state.addToCart.isShaking);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:1337/api/products?populate=*")
      .then((response) => response.json())
      .then((data) => setProducts(data.data, setIsLoading(false)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  const handleAddToCartAnimation = (id) => {
    dispatch(startSending(id));
    setTimeout(() => {
      dispatch(stopSending(id));
      dispatch(startShaking());
      setTimeout(() => {
        dispatch(stopShaking());
      }, 500); // Shaking duration
    }, 1000); // Sending duration
  };

  const filteredProducts = products.filter((item) =>
    item.attributes.Name.toUpperCase().includes(searchValue.toUpperCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const paginatedItems = filteredProducts.slice(firstIndex, lastIndex);
  const pageNumber = Math.ceil(filteredProducts.length / itemsPerPage);
  const numbers = [...Array(pageNumber + 1).keys()].slice(1);

  return (
    <>
      <div>
        <div className="d-sm-flex justify-content-sm-between align-items-center mx-5">
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            numbers={numbers}
          />
        </div>
        {isLoading ? (
          <div style={{ height: "500px" }}>
            <h1 className="loading-text p-5">Loading...</h1>
          </div>
        ) : (
          <div className="container my-5">
            <div className="row">
              {filteredProducts.length === 0 ? (
                <p>There are no products that match you search...</p>
              ) : (
                paginatedItems.map((product) => {
                  const inCartProduct = cartProduct.find(
                    (item) => item.id === product.id
                  );
                  const quantity = inCartProduct ? inCartProduct.quantity : 0;

                  return (
                    <div
                      className="card-wrapper col-10 col-sm-5 col-lg-3 g-3 gx-lg-5 mx-auto gy-5"
                      key={product.id}
                    >
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={`http://localhost:1337${product.attributes.Image.data.attributes.url}`}
                          alt={product.attributes.Name}
                        />
                        <div className="card-body">
                          <h2 className="card-title">
                            {product.attributes.Name}
                          </h2>
                          <div className="desc-container">
                            <p className="card-text desc-text">
                              {product.attributes.Description}
                            </p>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => {
                                setOpenModal(product);
                              }}
                            >
                              Read More
                            </button>
                          </div>
                          <h4
                            className={`card-text my-2 ${
                              product.attributes.onSale ? "sale" : ""
                            }`}
                          >
                            {product.attributes.Price}
                            <i className="bi bi-currency-dollar"></i>
                          </h4>
                          {product.attributes.onSale ? (
                            <h3>
                              {product.attributes.PriceonSale}{" "}
                              <i className="bi bi-currency-dollar"></i>
                            </h3>
                          ) : (
                            <h3 style={{ opacity: "0" }}>x</h3>
                          )}
                          <h5 className="card-text my-2">
                            Relase Date:{" "}
                            <span>{product.attributes.relaseDate}</span>
                          </h5>
                          {/* <div>
                            <div
                              className="d-flex justify-content-around align-content-center my-2"
                              style={{
                                visibility: quantity > 0 ? "visible" : "hidden",
                              }}
                            >
                              <a
                                className="btn btn-danger"
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(decreaseQuantity(product.id));
                                }}
                                href="#"
                              >
                                -
                              </a>
                              <h3>{quantity}</h3>
                              <a
                                className="btn btn-success"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (quantity === 0) {
                                    dispatch(
                                      addProduct({
                                        id: product.id,
                                        img: `http://localhost:1337${product.attributes.Image.data.attributes.url}`,
                                        name: product.attributes.Name,
                                        price: product.attributes.Price,
                                        onSale: product.attributes.onSale,
                                        priceOnSale:
                                          product.attributes.PriceonSale,
                                        relaseDate:
                                          product.attributes.relaseDate,
                                      })
                                    );
                                  } else {
                                    dispatch(increaseQuantity(product.id));
                                  }
                                }}
                                href="#"
                              >
                                +
                              </a>
                            </div>
                          </div> */}
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCartAnimation(product.id);
                              dispatch(
                                addProductAsync({
                                  id: product.id,
                                  img: `http://localhost:1337${product.attributes.Image.data.attributes.url}`,
                                  name: product.attributes.Name,
                                  price: product.attributes.Price,
                                  onSale: product.attributes.onSale,
                                  priceOnSale: product.attributes.PriceonSale,
                                  relaseDate: product.attributes.relaseDate,
                                })
                              );
                            }}
                            className={`btn btn-primary mx-auto d-table add-btn ${
                              isSending[product.id] ? "sendtocart" : ""
                            }`}
                          >
                            Add To Cart
                            <span className="add-item"></span>
                          </a>
                        </div>
                      </div>
                      {/* MODAL */}
                      {openModal && (
                        <Modal
                          product={openModal}
                          setOpenModal={setOpenModal}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto d-table">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numbers={numbers}
        />
      </div>
      <div className="divider"></div>
    </>
  );
};
