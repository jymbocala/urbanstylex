import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <Box m="30px auto">
      {/* BILLING FORM */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
        {/* Render the AddressForm component for billing address */}
        <AddressForm
          type="billingAddress"
          values={values.billingAddress} // The value of the form input for billing address
          errors={errors} // Errors object that contains error messages for validation
          touched={touched} // Boolean indicating whether the field has been touched
          handleBlur={handleBlur} // Handler for the onBlur event of the input field
          handleChange={handleChange} // Handler for the onChange event of the input field
        />
      </Box>

      {/* CHECKBOX */}
      <Box m="20px">
        <FormControlLabel
          label="Same for Shipping Address"
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress} // The value of the checkbox for same shipping address
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress
                )
              } // Toggle the value of 'isSameAddress' in the form values
            />
          }
        />
      </Box>

      {/* SHIPPING FORM */}
      {/* Render the AddressForm component for shipping address if 'isSameAddress' is false */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography sx={{ mb: "15px" }} fontSize="18px">
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress} // The value of the form input for shipping address
            errors={errors} // Errors object that contains error messages for validation
            touched={touched} // Boolean indicating whether the field has been touched
            handleBlur={handleBlur} // Handler for the onBlur event of the input field
            handleChange={handleChange} // Handler for the onChange event of the input field
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
