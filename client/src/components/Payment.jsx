import React, { useEffect, useState } from "react";
import CreditCardInput from "react-credit-card-input"; // Import komponente
import masterCard from "../assets/master.png";
import visaCard from "../assets/visa.webp";
import westernCard from "../assets/western.png";
import idealImg from "../assets/ideal.png";
import sofortImg from "../assets/sofort.png";
import "../styles/payment.css";

export const Payment = () => {
  // Stanja za kartične podatke
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  // Stanja za porudžbinu i selektovani način plaćanja
  const [order, setOrder] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("order"));
    if (savedOrder) {
      setOrder(savedOrder);
    }
    setLoading(false);
  }, []);

  const handlePayment = async () => {
    if (!order) return;
    const response = await fetch(
      `http://localhost:1337/api/orders/${order?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            orderStatus: "paid",
          },
        }),
      }
    );
    if (response.ok) {
      console.log("Order marked as paid");
    } else {
      console.error("Payment confirmation failed");
    }
  };

  const handleRadioChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>No order found</div>;
  }

  return (
    <div className="container-fluid row text-white">
      <div className="col my-5 my-sm-0">
        <h2>Payment for order {order?.id}</h2>
        <h3>Hi, {order?.attributes?.email}</h3>
        <p>You will receive confirmation mail after successfully payment.</p>
        <div className="border rounded-2 bg-secondary p-3">
          {/* FIRST */}
          <div className="d-flex gap-3 justify-content-between border-bottom-2">
            <div className="d-flex gap-3">
              <h1>
                <i className="bi bi-credit-card"></i>
              </h1>
              <div className="d-flex flex-column">
                <h3>Card</h3>
                <div className="d-flex gap-3">
                  <img src={masterCard} alt="masterCard" className="cards" />
                  <img src={visaCard} alt="visaCard" className="cards" />
                  <img src={westernCard} alt="westernCard" className="cards" />
                </div>
              </div>
            </div>
            <div>
              <input
                onChange={handleRadioChange}
                checked={selectedPayment === "card"}
                className="radio"
                type="radio"
                value="card"
                name="radio"
                id="cards"
              />
            </div>
          </div>

          {/* Prikaz unosa kartice kada je selektovana opcija 'Card' */}
          {selectedPayment === "card" && (
            <div className="my-3">
              <h5>Name on card</h5>
              <input className="input" type="text" name="nameOnCard" />

              <h5>Card number</h5>
              <CreditCardInput
                cardNumberInputProps={{
                  value: cardNumber,
                  onChange: (e) => setCardNumber(e.target.value),
                }}
                cardExpiryInputProps={{
                  value: expiry,
                  onChange: (e) => setExpiry(e.target.value),
                }}
                cardCVCInputProps={{
                  value: cvc,
                  onChange: (e) => setCvc(e.target.value),
                }}
                fieldClassName="input"
              />
            </div>
          )}

          {/* Drugi načini plaćanja */}
          <div className="divider"></div>
          <div className="d-flex justify-content-between my-4">
            <div className="d-flex gap-3">
              <img className="cards rounded-3" src={idealImg} alt="ideal" />
              <h3>iDEAL</h3>
            </div>
            <input
              onChange={handleRadioChange}
              checked={selectedPayment === "ideal"}
              className="radio"
              type="radio"
              name="radio"
              value="ideal"
              id="cards"
            />
          </div>

          <div className="divider"></div>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-3">
              <img className="cards rounded-3" src={sofortImg} alt="sofort" />
              <h3>Sofort</h3>
            </div>
            <input
              onChange={handleRadioChange}
              checked={selectedPayment === "sofort"}
              className="radio"
              type="radio"
              name="radio"
              id="cards"
              value="sofort"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="col">
        <h2>Summary</h2>
        {order?.attributes?.products?.map((item, index) => (
          <div key={index}>
            <h4>{item.name}</h4>
            <h5>
              Quantity {item.quantity} <i className="bi bi-dot"></i>{" "}
              <i className="bi bi-currency-dollar"></i>
              {item.price} each
            </h5>
          </div>
        ))}

        <div className="divider"></div>
        <div className="fw-bold d-flex justify-content-between">
          <h3>Total order amount</h3>
          <h3>
            {order?.attributes?.totalPrice}
            <i className="bi bi-currency-dollar"></i>
          </h3>
        </div>
        <button className="btn btn-success mt-5" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};
