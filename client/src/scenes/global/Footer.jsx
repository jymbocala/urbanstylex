import { useTheme, Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30% 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            Urban Style X
          </Typography>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae nemo
            eos, assumenda in perferendis ad ratione veniam sint nesciunt a
            aliquam sed nam. Obcaecati facere sapiente adipisci, tempora quia
            fugit maiores molestiae? Esse doloribus culpa sint dolore ratione
            enim sed qui nesciunt soluta distinctio accusamus error praesentium
            nisi, labore sit!
          </div>
        </Box>

        {/* Section: About Us */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        {/* Section: Customer Care */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Return & Refunds</Typography>
        </Box>

        {/* Section: Contact Us */}
        <Box width="clamp(20%, 25% 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            50 North Blvd, Melbourne, VIC 3000{" "}
          </Typography>
          <Typography mb="30px">Email: urbanstylex@gmail.com</Typography>
          <Typography mb="30px">(222)333-444</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
