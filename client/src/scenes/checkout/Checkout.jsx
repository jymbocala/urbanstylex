import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { shades } from "../../theme";
import { loadStripe } from "@stripe/stripe-js";
import * as yup from "yup";

const stripePromise = loadStripe(
  // Stripe public key for client-side integration
  "pk_test_51NLhYJCz6A4804eeAbMO9sIiHMx4Dy9eKpxr2bTcKQygyuwsptaw6Rle3AqK7kTI5I0Ijdct1sIvefccsTtALP1600mzR23iv2"
);

const initialValues = {
  // Initial form values
  billingAddress: {
    // Billing address fields
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    // Shipping address fields
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

// Validation schema for Formik
const checkoutSchema = yup.object().shape({
  billingAddress: yup.object().shape({
    // Validation for billing address fields
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    country: yup.string().required("required"),
    street1: yup.string().required("required"),
    street2: yup.string(),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
    zipCode: yup.string().required("required"),
  }),
  shippingAddress: yup.object().shape({
    // Validation for shipping address fields
    isSameAddress: yup.boolean(),
    firstName: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    lastName: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    country: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    street1: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    street2: yup.string(),
    city: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    state: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    zipCode: yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
  }),
  step2: yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email address"),
    phoneNumber: yup.string().required("Phone number is required"),
  }),
});


const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0); // Current step in the process
  const cart = useSelector((state) => state.cart.cart); // Redux state for cart
  const isFirstStep = activeStep === 0; // Check if it's the first step
  const isSecondStep = activeStep === 1; // Check if it's the second step

  // Function to handle form submission
  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1); // Move to the next step

    // Copies the bilingaddress onto  shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      // Check if it's the first step and the user selected the same address option
      actions.setFieldValue("shippingAddress", {
        // Set the value of the shippingAddress field
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({}); // Reset the validation everytime we go to the next step
  };

  // Function for payment using Stripe
  async function makePayment(values) {
    const stripe = await stripePromise;

    // Prepare the request body for creating an order
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "), // Combine first name and last name
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })), // Map cart items to include their IDs and quantities
    };

    // Send a POST request to create the order
    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // Retrieve the session information from the response
    const session = await response.json();

    // Redirect the user to the Stripe Checkout page for payment
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper active={activeStep} sx={{ m: "20px 0" }}>
        {/* Stepper component for step navigation */}
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                // Render the Shipping component if it's the first step
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                // Render the Shipping component if it's the first step
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}

                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {isFirstStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
