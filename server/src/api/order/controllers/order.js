"use strict";
// Import the Stripe library and initialize it with the secret key from the environment variables
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // Destructure the relevant properties from the request body
    const { products, userName, email } = ctx.request.body;

    try {
      // Retrieve item information first
      const lineItems = await Promise.all(
        products.map(async (product) => {
          // Retrieve item information for each product in the request
          const item = await strapi
            .service("api::item.item") // Access the "api::item.item" service in Strapi
            .findOne(product.id); // Find a specific item using the provided product ID
          return {
            // Create the line item object with price and quantity details
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name, // Set the product name
              },
              unit_amount: item.price * 100, // Convert the price to cents
            },
            quantity: product.count,
          };
        })
      );

      // Create a stripe session so the payment is processed
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Specify the accepted payment method types (in this case, card)
        customer_email: email,
        mode: "payment", // Set the mode to "payment" for a payment session
        success_url: "http://localhost:3000/checkout/success", // URL to redirect after successful payment
        cancel_url: "http://localhost:3000", // URL to redirect if payment is canceled
        line_items: lineItems, // Set the line items for the session
      });

      // Create the item order automatically using the order service
      await strapi.service("api::order.order").create({
        data: { userName, products, stripeSessionId: session.id }, // Set the data for the order, including the user name, products, and Stripe session ID
      });

      // Return the session id
      return { id: session.id };
    } catch (error) {
      // Handle any errors that occur during the process
      ctx.response.status = 500; // Set the response status to indicate an internal server error
      return {
        error: { message: "There was a problem create the charge." }, // Return an error message indicating the issue
      };
    }
  },
}));
