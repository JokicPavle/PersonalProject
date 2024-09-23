const fetch = require("node-fetch");

const API_URL = "http://localhost:1337/api/your-content-type";
const data = [
  // tvoji podaci za import
];

(async () => {
  try {
    console.log("Pokušavam da pošaljem podatke na:", API_URL);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Rezultat:", result);
  } catch (error) {
    console.error("Greška tokom izvođenja:", error);
  }
})();
