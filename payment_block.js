
const PRODUCT_DETAILS = {
    name: 'Credit Repair First Aid Kit',
    price: 47.00,
    currency: 'USD'
};
const PAYPAL_CLIENT_ID = 'https://us.onetimesecret.com/secret/1p3eiltu71svn180j5pvdynor7og1mg'; 
const STRIPE_PUBLISHABLE_KEY = 'https://us.onetimesecret.com/secret/12nt2qgau75nn5eeynchzsq3z8id8sk';
const GUMROAD_PRODUCT_URL = 'https://us.onetimesecret.com/secret/59a1wve73sa3bldui1cddrfe8gbsbt7'; 


document.getElementById('gumroad-checkout-button').href = GUMROAD_PRODUCT_URL;

function loadPayPal() {
    if (!PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID.startsWith('YOUR_')) {
        document.getElementById('paypal-button-container').innerHTML = '';
        return;
    }
    
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${PRODUCT_DETAILS.currency}`;
    script.onload = () => {
        paypal.Buttons({
            style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: PRODUCT_DETAILS.name,
                        amount: { value: PRODUCT_DETAILS.price }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(orderData) {
                    alert('PayPal Payment Successful! Transaction ID: ' + orderData.id);
                });
            },
            onError: function(err) {
                console.error(err);
                alert('PayPal payment failed. Please try again.');
            }
        }).render('#paypal-button-container');
    };
    document.head.appendChild(script);
}

function loadStripe() {
    if (!STRIPE_PUBLISHABLE_KEY || STRIPE_PUBLISHABLE_KEY.startsWith('YOUR_')) {
        document.getElementById('stripe-checkout-button').disabled = true;
        return;
    }

    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/';
    document.head.appendChild(stripeScript);
    
    stripeScript.onload = () => {
        const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

        document.getElementById('stripe-checkout-button').addEventListener('click', function() {
         
            alert("Stripe: This needs a secure server endpoint to create a Checkout Session.");
        });
    };
}

function loadGumroadOverlay() {
    if (!GUMROAD_PRODUCT_URL || GUMROAD_PRODUCT_URL.startsWith('YOUR_')) {
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://gumroad.com/js/gumroad.js';
    document.head.appendChild(script);
}

loadPayPal();
loadStripe();
loadGumroadOverlay();