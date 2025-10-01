// Replace these values with client credentials/links
const CONFIG = {
  PAYPAL_CLIENT_ID: "YOUR_PAYPAL_CLIENT_ID_HERE",
  STRIPE_PAYMENT_LINK: "YOUR_STRIPE_LINK_HERE",
  GUMROAD_PRODUCT_URL: "YOUR_GUMROAD_URL_HERE",
  PRICE: "47.00",
  CURRENCY: "USD"
};

// Inject PayPal SDK
const paypalScript = document.getElementById("paypal-sdk");
paypalScript.src = `https://www.paypal.com/sdk/js?client-id=${CONFIG.PAYPAL_CLIENT_ID}&currency=${CONFIG.CURRENCY}`;

// Stripe & Gumroad buttons
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("stripe-btn").href = CONFIG.STRIPE_PAYMENT_LINK;
  document.getElementById("gumroad-btn").href = CONFIG.GUMROAD_PRODUCT_URL;
});

// PayPal Render
paypalScript.onload = () => {
  if (typeof paypal !== "undefined") {
    paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "pill",
        label: "paypal"
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: CONFIG.PRICE }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          alert(`Thanks, ${details.payer.name.given_name}! Payment successful.`);
        });
      }
    }).render("#paypal-button-container");
  }
};
