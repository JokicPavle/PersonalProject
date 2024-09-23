import React, { useState, useMemo } from "react";
import logoImg from "../assets/logo.png";
import Select from "react-select";
import countryList from "react-select-country-list";
import { getTotalQuantity } from "../state/cartProducts";
import { useSelector } from "react-redux";
import "../styles/checkout.css";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
const schema = Yup.object().shape({
  email: Yup.string().email("Incorrect email").required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  city: Yup.string().required("City is required"),
  country: Yup.object()
    .shape({
      value: Yup.string().required("Country/Region is required"),
      label: Yup.string().required("Country/Region is required"),
    })
    .nullable()
    .required("Country/Region is required"),
  state: Yup.string().required("Province/State is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone is required"),
});
export const Checkout = () => {
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cartProducts);
  const [showInfo, setShowInfo] = useState(true);
  const [country, setCountry] = useState(null);
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (selectedOption) => {
    setCountry(selectedOption);
    setValue("country", selectedOption);
  };
  const totalQuantity = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const totalPrice = cartProducts.reduce((prevValue, item) => {
    const itemPrice = item.priceOnSale || item.price;
    return prevValue + item.quantity * itemPrice;
  }, 0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const orderData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      country: data.country.label,
      state: data.state,
      zipCode: data.zipCode,
      phone: data.phone,
      products: cartProducts.map((product) => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      })),
      totalPrice,
      orderStatus: "pending",
    };

    try {
      // POST REQUEST ON STRAPI BECKEND
      const response = await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: orderData }),
      });

      if (response.ok) {
        const data = await response.json();
        const createdOrder = data.data;
        localStorage.setItem("order", JSON.stringify(createdOrder));
        navigate("/payment");
      } else {
        console.error("Order submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="text-white ps-0 container-fluid mx-auto row flex-column-reverse flex-sm-row">
      <div className="col-10 mx-auto col-sm-6 ps-1 px-sm-3">
        <h1 className="my-2">Order summary</h1>
        <h3 className="my-4">{`Your shopping cart contains ${totalQuantity} item ${
          getTotalQuantity > 1 ? "'s" : ""
        }`}</h3>
        {cartProducts.map((product) => (
          <div className="my-4 row" key={product.id}>
            <div className="col-4">
              <img
                className="productImg"
                src={product.img}
                alt="product Image"
              />
            </div>
            <div className="d-flex flex-column align-items-start col-5">
              <h3>{product.name}</h3>
              <div className="quantity  text-uppercase bg-black rounded-3 text-center">
                Quantity: {product.quantity}
              </div>
            </div>
            <div className="col-3 p-0">
              {product.price} <i className="bi bi-currency-dollar"></i>
            </div>
          </div>
        ))}
        <div className="divider"></div>
        <div>
          <div className="d-flex my-4">
            <input
              className="rounded-start-1 border-0 px-2"
              type="text"
              placeholder="Gift card or coupon code"
            />
            <button className="btn btn-dark rounded-start-0">Apply</button>
          </div>
          <p>
            Caution: discount coupons are not valid on products already on sale
            or excluded from promotions.
          </p>
        </div>
        <div className="divider"></div>
        <div className="d-flex justify-content-between">
          <h5>Subtotal</h5>
          <p>
            {totalPrice} <i className="bi bi-currency-dollar"></i>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <h5>Shipping</h5>
          <p>To be calculated</p>
        </div>
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold">
            Tax <span className="fw-norma">included</span>
          </h5>
          <p>To be calculated</p>
        </div>
        <div className="divider"></div>
        <div>
          <h5 className="d-flex justify-content-end fw-bold">{totalPrice} $</h5>
        </div>
        <div className="divider"></div>
        <button className="text-uppercase d-sm-none btn btn-dark my-3">
          Continue to payment
        </button>
        <Link to="/">
          <button className="btn btn-light text-uppercase checkout-btn my-3">
            Return to Homepage
          </button>
        </Link>
      </div>
      <div className="col-10 mx-auto col-sm-6 ps-1 px-sm-3">
        <div className="d-flex d-sm-block my-2 justify-content-between my-3">
          <h3 className="text-uppercase">Checkout</h3>
          <div className="divider d-none d-sm-block fw-bolder"></div>
          <div className="d-block d-sm-none">
            <h3>{totalPrice} $</h3>
          </div>
          <div className="d-none d-sm-flex justify-content-center gap-4 w-75 align-items-center">
            <h4>Customer</h4>
            <i className="bi bi-arrow-right"></i>
            <h4>Payment</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-start my-3">
          <div>
            <h2>
              <i className="bi bi-1-circle-fill me-2"></i>
              CUSTOMER
            </h2>
            <p className="my-2">Fill in your Billing/Shipping Address</p>
          </div>
          <div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="btn-dark btn btn-sm"
            >
              {!showInfo ? (
                <i className="bi bi-arrow-up"></i>
              ) : (
                <i className="bi bi-arrow-down"></i>
              )}
            </button>
          </div>
        </div>
        {showInfo && (
          <div>
            <p>*required fields</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="position-relative my-4">
                <label className="label" htmlFor="email">
                  Your email address*
                </label>
                <input
                  {...register("email")}
                  className="input"
                  type="email"
                  name="email"
                />
                <p>{errors.email?.message}</p>
              </div>
              <h4>Customer Informations</h4>
              <div className="position-relative my-4">
                <label className="label" htmlFor="firstName">
                  First Name*
                </label>
                <input
                  {...register("firstName")}
                  className="input"
                  type="tel"
                  name="firstName"
                />
                <p>{errors.firstName?.message}</p>
              </div>
              <div className="position-relative my-4">
                <label className="label" htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  {...register("lastName")}
                  className="input"
                  type="text"
                  name="lastName"
                />
                <p>{errors.lastName?.message}</p>
              </div>
              <div className="position-relative my-4">
                <label className="label" htmlFor="city">
                  City*
                </label>
                <input
                  {...register("city")}
                  className="input"
                  type="text"
                  name="city"
                />
                <p>{errors.city?.message}</p>
              </div>
              <div className="position-relative my-4">
                <label className="label" data-type="region" htmlFor="region">
                  Country/Region*
                </label>
                <Select
                  options={options}
                  value={country}
                  onChange={changeHandler}
                  // name="region"
                  // {...register("country")}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      padding: "5px",
                      outline: state.isFocused ? "2px solid #ec4186" : "",
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      priamry: "#ec4186",
                    },
                  })}
                />
                <p>{errors.country?.label?.message}</p>
                {/* <select className="input" type="text" name="region"></select> */}
              </div>
              <div className="position-relative my-4">
                <label className="label" htmlFor="state">
                  Province/State*
                </label>
                <input
                  {...register("state")}
                  className="input"
                  type="text"
                  name="state"
                />
                <p>{errors.state?.message}</p>
              </div>
              <div className="position-relative my-4">
                <label className="label" htmlFor="zipCode">
                  Zip Code*
                </label>
                <input
                  {...register("zipCode")}
                  className="input"
                  type="text"
                  name="zipCode"
                />
                <p>{errors.zipCode?.message}</p>
              </div>
              <div className="position-relative my-4">
                <label className="label" htmlFor="phone">
                  Phone*
                </label>
                <input
                  {...register("phone")}
                  className="input"
                  type="number"
                  name="phone"
                />
                <p>{errors.phone?.message}</p>
              </div>
              <button className="text-uppercase btn btn-dark my-3 d-none d-sm-block">
                Continue to payment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
