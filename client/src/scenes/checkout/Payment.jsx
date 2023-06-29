import { Box, Typography, TextField } from "@mui/material";

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Info
        </Typography>
        {/* Email */}
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email} // Checking if email field is touched and has an error
          helperText={touched.email && errors.email} // Displaying error message for the email field
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        {/* Phone Number */}
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber} // Checking if phone number field is touched and has an error
          helperText={touched.phoneNumber && errors.phoneNumber} // Displaying error message for the phone number field
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
    </Box>
  );
};

export default Payment;
